<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarCategory;
use App\Models\CarCharateristic;
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
            ['code' => 'A', 'color' => "#BFC5C5", 'name' => 'Citadino 3P', 'min_caution' => 800],
            ['code' => 'B', 'color' => "#A8D6E3", 'name' => 'Utilitário 5P', 'min_caution' => 850],
            ['code' => 'C', 'color' => "#FFC103", 'name' => 'Utilitário 5P c/ AC', 'min_caution' => 1250],
            ['code' => 'D', 'color' => "#951D26", 'name' => 'SUV/Crossover', 'min_caution' => 1350]
        ];

        foreach ($levels as $item) {
            Level::create($item);
        }

        $charateristics = [
            ['title' => 'Combustível', 'name' => 'gas', 'icon' => '/icon/charateristics/gas.svg'],
            ['title' => 'Portas', 'name' => 'people', 'icon' => '/icon/charateristics/people.svg'],
            ['title' => 'Capacidade', 'name' => 'doors', 'icon' => '/icon/charateristics/doors.svg'],
            ['title' => 'Caixa', 'name' => 'shift_mode', 'icon' => '/icon/charateristics/shift.svg'],
            ['title' => 'A/C', 'name' => 'air', 'icon' => '/icon/charateristics/air.svg']
        ];

        foreach ($charateristics as $charateristic) {
            CarCharateristic::create($charateristic);
        }


        $categories = [
            [
                'title' => 'Fiat Panda',
                'level_id' => 1,
                'subtitle' => 'City Life',
                'image' => '/image/garage/fiat_panda.png',
                'descen' => '',
                'descpt' => '',
                'gas' => 'gasoline', 'people' => 3, 'doors' => 3, 'shift_mode' => 'manual', 'air' => null,
            ],
            [
                'title' => 'Toyota Yaris',
                'level_id' => 2,
                'image' => '/image/garage/yaris.png',
                'descen' => 'Compact, agile, economic and ready for anything',
                'descpt' => 'Compacto, ágil, económico e pronto para tudo',
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => null,
            ],
            [
                'title' => 'Toyota Aygo X',
                'level_id' => 2,
                'image' => '/image/garage/aygo.png',
                'descen' => '',
                'descpt' => '',
                'gas' => 'gasoline', 'people' => 4, 'doors' => 5, 'shift_mode' => 'manual', 'air' => null,
            ],
            [
                'level_id' => 3,
                'title' => 'Dacia Sandero III',
                'image' => '/image/garage/sandero.png',
                'descen' => 'With its robust silhouette, redesigned front end enhanced by the brand\'s new Y-shaped signature LED headlights, the New Sandero reveals its totally renewed design. Inside, with one of the best habitabilities in its category, luggage compartment and generous spaces, it adapts to your everyday life to make your journey even more enjoyable.',
                'descpt' => 'Com a sua silhueta robusta, a dianteira reformulada e realçada pela nova assinatura da marca em forma de Y com faróis LED, o Novo Sandero revela o seu design totalmente renovado. No interior, com uma das melhores habitabilidades da sua categoria, bagageira e espaços generosos, adapta-se ao seu dia a dia para tornar a sua viagem ainda mais agradável.',
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => null,
            ],
            [
                'level_id' => 3,
                'title' => 'Renault Clio V',
                'image' => '/image/garage/clio.png',
                'descen' => 'With sensual lines, a dynamic profile, sculpted sides and all new full LED signature lighting. The all NEW CLIO seduces you with style from the first look.',
                'descpt' => 'Linhas sensuais, perfil dinâmico, flancos esculturais e nova assinatura luminosa com iluminação em full LED. Desde o primeiro olhar, o CLIO seduz pelo seu estilo.',
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => null,
            ],
            [
                'level_id' => 3,
                'title' => 'Peugeot 208',
                'image' => '/image/garage/208.png',
                'descen' => '',
                'descpt' => '',
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => null,
            ],
            [
                'level_id' => 4,
                'title' => 'Dacia Sandero III Stepway',
                'image' => '/image/garage/daciastep.png',
                'descen' => 'With an imposing silhouette, straight, horizontal lines, a new Y-shaped LED light signature and high ground clearance. The New Sandero Stepway reveals its completely redesigned design and reaffirms its crossover style. Inside, settle into a generous and multipurpose space to live out your adventures in 100% comfort.',
                'descpt' => 'Com uma silhueta imponente, linhas direitas e horizontais, nova assinatura luminosa da marca em LED em forma de Y e distância ao solo elevada. O Novo Sandero Stepway revela o seu design totalmente remodelado e reafirma o seu estilo de crossover. No interior, instale-se num espaço generoso e polivalente para viver as suas aventuras com 100% de conforto.',
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => null,
            ],
        ];

        foreach ($categories as $category) {
            $carCategory = CarCategory::create([
                'title' => $category["title"],
                'level_id' => $category["level_id"],
                'image' => $category["image"],
                'description' => [
                    'en' => $category["descen"],
                    'pt' => $category["descpt"]
                ],
            ]);

            $carCategory->charateristics()->attach(1, ['value' => $category["gas"]]);
            $carCategory->charateristics()->attach(2, ['value' => $category["people"]]);
            $carCategory->charateristics()->attach(3, ['value' => $category["doors"]]);
            $carCategory->charateristics()->attach(4, ['value' => $category["shift_mode"]]);
            $carCategory->charateristics()->attach(5, ['value' => $category["air"]]);
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
                'registration' => 'AU-37-DF',
                'car_category_id' => 2,
            ],
            [
                'registration' => 'AT-39-XU',
                'car_category_id' => 4,
            ],
            [
                'registration' => 'AO-73-DD',
                'car_category_id' => 5,
            ],
            [
                'registration' => 'AO-93-DC',
                'car_category_id' => 5,
            ],
            [
                'registration' => 'AO-51-DD',
                'car_category_id' => 5,
            ],
            [
                'registration' => 'AT-60-IQ',
                'car_category_id' => 7,
            ],
            [
                'registration' => 'AT-94-IQ',
                'car_category_id' => 7,
            ],

        ];

        foreach ($cars as $item) {
            Car::create([
                'status' => true,
                'registration' => $item["registration"],
                'car_category_id' => $item["car_category_id"],
            ]);
        }
    }
}
