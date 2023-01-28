<?php

namespace Database\Seeders;

use App\Models\Insurance;
use Illuminate\Database\Seeder;

class InsuranceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Insurance::create([
            'name' => [
                'pt' => 'Básico',
                'en' => 'Basic',
            ],
            'description' => [
                'pt' => 'Cobertura CDW (Collision Damage Waiver)',
                'en' => 'CDW (Collision Damage Waiver) protection',
            ],
            'description_one' => [
                'pt' => 'Sujeito a franquia / depósito de segurança',
                'en' => 'Subject to a excess / security deposit',
            ],
            'price' => 0

        ]);

        Insurance::create([
            'name' => [
                'pt' => 'Premium',
                'en' => 'Premium',
            ],
            'description' => [
                'pt' => 'Cobertura Premium - SCDW (Super Collision Damage Waiver)',
                'en' => 'Premium coverage - SCDW (Super Collision Damage Waiver)',
            ],
            'description_one' => [
                'pt' => 'Possíveis danos estão cobertos',
                'en' => 'Possible damages are covered',
            ],
            'price' => 15

        ]);
    }
}
