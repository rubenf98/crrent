<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use setasign\Fpdi\Fpdi;
use Cerbero\QueryFilters\FiltersRecords;

class Reservation extends Model
{
    protected $fillable = ['card_id', 'car_price_per_day', 'days', 'car_price', 'token', 'pickup_date', 'return_date', 'pickup_place', 'return_place', 'flight', 'price', 'car_id', 'client_id'];

    use HasFactory, FiltersRecords;

    protected $casts = [
        'car_price' => 'decimal:2',
        'car_price_per_day' => 'decimal:2',
        'price' => 'decimal:2',
    ];

    public function generateDoc()
    {
        $outputFile = Storage::disk('local')->path($this->token . ".pdf");
        $file = Storage::disk('local')->path('template.pdf');
        $fpdi = new FPDI;
        // merger operations
        $count = $fpdi->setSourceFile($file);
        for ($i = 1; $i <= $count; $i++) {
            $template   = $fpdi->importPage($i);
            $size       = $fpdi->getTemplateSize($template);
            $fpdi->AddPage($size['orientation'], array($size['width'], $size['height']));
            $fpdi->useTemplate($template);

            if ($i == 1 || $i == 2) {
                $fpdi->SetFont("helvetica", "", 9);
                $fpdi->SetTextColor(0, 10, 10);

                $this->fillGeneralInfo($fpdi);
                $this->fillClientInfo($fpdi);
                $drivers = $this->drivers()->get();
                $start = 0;
                foreach ($drivers as $driver) {
                    $this->fillDriverInfo($fpdi, $driver, $start);

                    $start += 26;
                }

                $extras = $this->extras;
                $this->fillPriceInfo($fpdi, $extras);
            }
        }
        return $fpdi->Output($outputFile, 'F');
    }

    public function fillPriceInfo($fpdi, $extras)
    {
        $fpdi->Text(92, 195.5, $this->car_price . chr(128));

        $fpdi->Text(92, 242, $this->price . chr(128));

        $fpdi->Text(68, 206.5, $this->days);
        $fpdi->Text(78, 206.5, 15 . chr(128));
        $fpdi->Text(92, 206.5, ($this->days * 15) . chr(128));

        $others = 0;
        $tax_pickup = 0;
        $tax_return = 0;

        foreach ($extras as $extra) {
            if ($extra->id == 2) {
                $fpdi->Text(68, 199, 1);
                $fpdi->Text(78, 199, $extra->price . chr(128));
                $fpdi->Text(92, 199, $extra->price . chr(128));
            }

            if ($extra->id == 4 || $extra->id == 1) {
                $others += $this->days * $extra->price;
            }

            if ($extra->id == 3) {
                $fpdi->Text(68, 218, $this->days);
                $fpdi->Text(78, 218, $extra->price . chr(128));
                $fpdi->Text(92, 218, ($this->days * $extra->price) . chr(128));
            }

            if ($extra->id == 5 || $extra->id == 6) {
                $tax_pickup += $extra->price;
            }

            if ($extra->id == 7 || $extra->id == 8) {
                $tax_return += $extra->price;
            }
        }

        if ($tax_pickup) {
            $fpdi->Text(92, 221.5, $tax_pickup . chr(128));
        }

        if ($tax_return) {
            $fpdi->Text(92, 225.5, $tax_return . chr(128));
        }

        if ($others) {
            $fpdi->Text(92, 229.5, $others . chr(128));
        }
    }

    public function fillDriverInfo($fpdi, $driver, $start)
    {
        $fpdi->Text(26, $start + 115, utf8_decode($driver->name));

        $birth = Carbon::parse($driver->birthday);
        $fpdi->Text(162, $start + 115, str_pad($birth->day, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(171, $start + 115, str_pad($birth->month, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(178, $start + 115, str_pad($birth->year, 2, '0', STR_PAD_LEFT));

        $fpdi->Text(15, $start + 129.5, $driver->license);

        $emission = Carbon::parse($driver->emission);
        $fpdi->Text(75, $start + 129.5, str_pad($emission->day, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(84, $start + 129.5, str_pad($emission->month, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(91.5, $start + 129.5, str_pad($emission->year, 2, '0', STR_PAD_LEFT));

        $validity = Carbon::parse($driver->validity);
        $fpdi->Text(123, $start + 129.5, str_pad($validity->day, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(133, $start + 129.5, str_pad($validity->month, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(140, $start + 129.5, str_pad($validity->year, 2, '0', STR_PAD_LEFT));

        $fpdi->Text(165, $start + 129.5, $driver->emission_place);
    }

    public function fillClientInfo($fpdi)
    {
        $client = $this->client()->first();
        $fpdi->Text(32, 79.5, utf8_decode($client->company));
        $fpdi->Text(143, 79.5, $client->phone);

        $fpdi->Text(26, 84.5, utf8_decode($client->name));
        $fpdi->Text(32, 89.5, utf8_decode($client->address));
        $fpdi->Text(40, 94.5, $client->postal_code);
        $fpdi->Text(92, 94.5, utf8_decode($client->email));

        $fpdi->Text(27, 99.5, $client->cc);
        $fpdi->Text(105, 99.5, utf8_decode($client->country));
        $fpdi->Text(159, 99.5, $client->nif);

        $fpdi->Text(50, 104, utf8_decode($client->local_address));
    }

    public function fillGeneralInfo($fpdi)
    {
        $fpdi->Text(26, 53, utf8_decode($this->pickup_place));

        $pickupDate = Carbon::parse($this->pickup_date);
        $fpdi->Text(25, 58, str_pad($pickupDate->day, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(34, 58, str_pad($pickupDate->month, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(41.5, 58, str_pad($pickupDate->year, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(86, 58, str_pad($pickupDate->hour, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(96, 58, str_pad($pickupDate->minute, 2, '0', STR_PAD_LEFT));

        $fpdi->Text(17, 63, utf8_decode($this->flight));


        $fpdi->Text(126, 53, utf8_decode($this->return_place));

        $returnDate = Carbon::parse($this->return_date);
        $fpdi->Text(125, 58, str_pad($returnDate->day, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(134, 58, str_pad($returnDate->month, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(141.5, 58, str_pad($returnDate->year, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(186, 58, str_pad($returnDate->hour, 2, '0', STR_PAD_LEFT));
        $fpdi->Text(196, 58, str_pad($returnDate->minute, 2, '0', STR_PAD_LEFT));
    }

    public function extras()
    {
        return $this->belongsToMany(Extra::class, 'reservation_has_extras');
    }

    public function drivers()
    {
        return $this->belongsToMany(Driver::class, 'reservation_has_drivers');
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function card()
    {
        return $this->hasOne(Card::class);
    }
}
