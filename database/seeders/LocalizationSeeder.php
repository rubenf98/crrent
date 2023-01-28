<?php

namespace Database\Seeders;

use App\Models\Localization;
use Illuminate\Database\Seeder;

class LocalizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Localization::create([
            'name' => [
                'en' => "Store",
                'pt' => "Loja"
            ],
            'price' => 0
        ]);

        Localization::create([
            'name' => [
                'en' => "Airport",
                'pt' => "Aeroporto"
            ],
            'price' => 20
        ]);
    }
}
