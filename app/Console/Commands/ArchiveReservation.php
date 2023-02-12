<?php

namespace App\Console\Commands;

use App\Models\BlockDate;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ArchiveReservation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'archive:reservation';

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
        $reservations = Reservation::where('pickup_date', '<', Carbon::now())
            ->where("status", "pendente")->get();

        foreach ($reservations as  $reservation) {
            $reservation->status = "cancelado";
            $reservation->save();

            $blockedDates = BlockDate::where('reservation_id', $reservation->id)->get();

            foreach ($blockedDates as $blockedDate) {
                $blockedDate->delete();
            }
        }

        return 0;
    }
}
