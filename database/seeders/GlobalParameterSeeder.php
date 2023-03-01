<?php

namespace Database\Seeders;

use App\Models\GlobalParameter;
use Illuminate\Database\Seeder;

class GlobalParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['name' => 'Hora mínima de reservas', 'code' => 'min_time', 'value' => "7"],
            ['name' => 'Hora máxima de reservas', 'code' => 'max_time', 'value' => "22"],
            ['name' => 'Hora mínima para aplicar taxa', 'code' => 'min_tax_time', 'value' => "9"],
            ['name' => 'Hora máxima para aplicar taxa', 'code' => 'max_tax_time', 'value' => "20"],

            ['name' => 'Limite para futuras reservas na plataforma', 'code' => 'max_date', 'value' => '01-01-2024'],
            ['name' => 'Número máximo de dias para uma reserva', 'code' => 'max_days', 'value' => "31"],

            ['name' => 'Reservas na plataforma', 'code' => 'enable_reservations', 'value' => "1"],
            ['name' => 'Notificações diárias', 'code' => 'enable_notifications', 'value' => "1"],

            ['name' => 'Diferença mínima em horas entre reservas', 'code' => 'min_hours', 'value' => "8"],
            ['name' => 'Número mínimo de dias para uma reserva', 'code' => 'min_days', 'value' => "1"],

            ['name' => 'Intervalo entre reservas (minutos)', 'code' => 'reservation_difference', 'value' => "120"],

        ];
        foreach ($items as $item) {
            GlobalParameter::create($item);
        }
    }
}
