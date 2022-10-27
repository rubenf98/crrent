<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Level;
use App\Models\Price;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $levels = [
            ['code' => 'A', 'name' => 'Citadino 3P', 'min_caution' => 800],
            ['code' => 'B', 'name' => 'Utilitário 5P', 'min_caution' => 850],
            ['code' => 'C', 'name' => 'Utilitário 5P c/ AC', 'min_caution' => 1250],
            ['code' => 'D', 'name' => 'SUV/Crossover', 'min_caution' => 1350]
        ];

        foreach ($levels as $item) {
            Level::create($item);
        }

        $prices = [
            ['min' => 2, 'max' => 6, 'price' => 35, 'level_id' => 1],
            ['min' => 7, 'max' => 14, 'price' => 31, 'level_id' => 1],
            ['min' => 15, 'max' => 10000, 'price' => 27.5, 'level_id' => 1],

            ['min' => 2, 'max' => 6, 'price' => 40, 'level_id' => 2],
            ['min' => 7, 'max' => 14, 'price' => 36, 'level_id' => 2],
            ['min' => 15, 'max' => 10000, 'price' => 32, 'level_id' => 2],

            ['min' => 2, 'max' => 6, 'price' => 50, 'level_id' => 3],
            ['min' => 7, 'max' => 14, 'price' => 46, 'level_id' => 3],
            ['min' => 15, 'max' => 10000, 'price' => 40, 'level_id' => 3],

            ['min' => 2, 'max' => 6, 'price' => 55, 'level_id' => 4],
            ['min' => 7, 'max' => 14, 'price' => 51, 'level_id' => 4],
            ['min' => 15, 'max' => 10000, 'price' => 45, 'level_id' => 4],
        ];

        foreach ($prices as $item) {
            Price::create($item);
        }

        $cars = [
            [
                'title' => 'Fiat Panda',
                'subtitle' => 'City Life',
                'level_id' => 1,
                'gas' => 'gasoline', 'people' => 3, 'doors' => 3, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],
            [
                'title' => 'Toyota iQ',
                'subtitle' => 'iQ',
                'level_id' => 1,
                'gas' => 'gasoline', 'people' => 3, 'doors' => 3, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],



            [
                'title' => 'Opel Corsa',
                'subtitle' => 'Opel Corsa',
                'level_id' => 2,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],
            [
                'title' => 'Nissan Micra',
                'subtitle' => 'iQ',
                'level_id' => 2,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],
            [
                'title' => 'Toyota Aygo X',
                'subtitle' => 'iQ',
                'level_id' => 2,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],



            [
                'title' => 'VW Polo',
                'subtitle' => 'City Life',
                'level_id' => 3,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],
            [
                'title' => 'Renault Clio 5P',
                'subtitle' => 'iQ',
                'level_id' => 3,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],




            [
                'title' => 'Renault Captur',
                'subtitle' => 'City Life',
                'level_id' => 4,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],
            [
                'title' => 'Peugeot 2008',
                'subtitle' => 'iQ',
                'level_id' => 4,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual',
                'image' => '/image/garage/template.png'
            ],

        ];

        foreach ($cars as $item) {
            Car::create($item);
        }
    }
}
