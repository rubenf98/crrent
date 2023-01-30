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
                'en' => "Outside funchal",
                'pt' => "Fora do funchal"
            ],
            'visible' => false,
            'price' => 20
        ]);

        Localization::create([
            'name' => [
                'en' => "Inside funchal",
                'pt' => "Dentro do funchal"
            ],
            'visible' => false,
            'price' => 0
        ]);

        Localization::create([
            'name' => [
                'en' => "Store",
                'pt' => "Loja"
            ],
            'visible' => true,
            'price' => 0
        ]);

        Localization::create([
            'name' => [
                'en' => "Airport",
                'pt' => "Aeroporto"
            ],
            'visible' => true,
            'price' => 10
        ]);
    }
}
