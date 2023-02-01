<?php

namespace App\Console\Commands;

use App\Mail\NotificationMail;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class EmailNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $startDate =  Carbon::now()->startOfDay()->addDay();
        $endDate = Carbon::now()->endOfDay()->addDay();
        $pickupContent = [];
        $returnContent = [];

        $pickups = Reservation::with("car")->with("car.category")
            ->with('client')->orderBy('pickup_date', 'asc')
            ->whereBetween('pickup_date', [$startDate, $endDate])->get();


        $returns = Reservation::with("car")->with("car.category")
            ->with('client')->orderBy('pickup_date', 'asc')
            ->whereBetween('return_date', [$startDate, $endDate])->get();

        if (count($pickups)) {
            foreach ($pickups as $pickup) {
                array_push($pickupContent, "Reserva nº " . $pickup->id . " no(a) " . $pickup->pickup_place . " às " . Carbon::parse($pickup->pickup_date)->format('H:i') . "h para levantamento do " . $pickup->car->category->title . " (" . $pickup->car->registration . ") com o cliente " . $pickup->client->name);
            }
        } else {
            array_push($pickupContent, "Não existem levantamentos agendados para amanhã");
        }

        if (count($returns)) {
            foreach ($returns as $return) {
                array_push($returnContent, "Reserva nº " . $return->id . " no(a) " . $return->return_place . " às " . Carbon::parse($return->return_date)->format('H:i') . "h para devolução do " . $return->car->category->title . " (" . $return->car->registration . ") com o cliente " . $return->client->name);
            }
        } else {
            array_push($returnContent, "Não existem devoluções agendadas para amanhã");
        }

        Mail::to('jrubenf98@gmail.com')->queue(new NotificationMail($pickupContent, $returnContent));
    }
}
