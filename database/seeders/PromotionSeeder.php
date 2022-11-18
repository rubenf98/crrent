<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $extras = [
            ['start' => '2022-11-01', 'end' => '2022-12-14', 'factor' => .6, 'value' => "40%"],
        ];

        foreach ($extras as $item) {
            Promotion::create($item);
        }
    }
}
