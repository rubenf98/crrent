<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(GlobalParameterSeeder::class);
        $this->call(CarSeeder::class);
        $this->call(ExtraSeeder::class);
        $this->call(PromotionSeeder::class);
        $this->call(LocalizationSeeder::class);
        $this->call(InsuranceSeeder::class);
    }
}
