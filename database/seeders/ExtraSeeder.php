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
            ['name' => 'Cobertura SCDW', 'price' => 15, 'type' => 'day'],
            ['name' => 'Cobertura vidros e pneus', 'price' => 5, 'type' => 'day'],
            ['name' => 'Condutor adicional', 'price' => 15, 'type' => 'uni'],
            ['name' => 'Cadeira de bébé', 'price' => 15, 'type' => 'day'],
            ['name' => 'Assento de criança', 'price' => 15, 'type' => 'day'],
            ['name' => 'Taxa de entrega', 'price' => 20, 'type' => 'uni', "visible" => false],
            ['name' => 'Entrega fora do horário de expediente', 'price' => 15, 'type' => 'uni', "visible" => false],
            ['name' => 'Taxa de devolução', 'price' => 20, 'type' => 'uni', "visible" => false],
            ['name' => 'Levantamento fora do horário de expediente', 'price' => 15, 'type' => 'uni', "visible" => false],
        ];

        foreach ($extras as $item) {
            Extra::create($item);
        }
    }
}
