<?php

namespace App\Console\Commands;

use App\Mail\ComissionNotificationMail;
use App\Models\Comission;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class ComissionNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:comissionnotification';

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
        $comissions = Comission::where('paid', 0)->where('value', ">", 0)->with('agency')->get();
        Mail::to('info@cr-rent.com')->queue(new ComissionNotificationMail($comissions));
    }
}
