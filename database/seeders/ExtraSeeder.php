<?php

namespace Database\Seeders;

use App\Models\Extra;
use Illuminate\Database\Seeder;

class ExtraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $extras = [
            [
                'name' => [
                    'en' => "Windows and tyres cover",
                    'pt' => "Cobertura vidros e pneus"
                ], 'price' => 5, 'type' => 'day', "visible" => true
            ],
            [
                'name' => [
                    'en' => "Additional driver",
                    'pt' => "Condutor adicional"
                ], 'price' => 10, 'type' => 'uni', "visible" => true
            ],
            [
                'name' => [
                    'en' => "Baby seat",
                    'pt' => "Cadeira de bébé"
                ], 'price' => 4, 'type' => 'day', "visible" => true
            ],
            [
                'name' => [
                    'en' => "Child seat",
                    'pt' => "Assento de criança"
                ], 'price' => 2.5, 'type' => 'day', "visible" => true
            ],
            [
                'name' => [
                    'en' => "Return outside office hours",
                    'pt' => "Entrega fora do horário de expediente"
                ], 'price' => 15, 'type' => 'uni', "visible" => false
            ],
            [
                'name' => [
                    'en' => "Pickup outside office hours",
                    'pt' => "Levantamento fora do horário de expediente"
                ], 'price' => 15, 'type' => 'uni', "visible" => false
            ],
        ];

        foreach ($extras as $item) {
            Extra::create([
                'name' => [
                    'en' => $item["name"]["en"],
                    'pt' => $item["name"]["pt"]
                ],
                'type' => $item["type"],
                'price' => $item["price"],
                'visible' => $item["visible"],

            ]);
        }
    }
}
