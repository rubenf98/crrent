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
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 3, 'doors' => 3, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/fiat_panda.png',
                'descen' => '',
                'descpt' => '',
            ],


            [
                'title' => 'Toyota Yaris',
                'registration' => 'AU-37-DF',
                'subtitle' => 'Comfort Plus',
                'level_id' => 2,
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 3, 'doors' => 3, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/yaris.png',
                'descen' => 'Compact, agile, economic and ready for anything',
                'descpt' => 'Compacto, ágil, económico e pronto para tudo',
            ],
            [
                'title' => 'Toyota Aygo X',
                'subtitle' => 'X',
                'level_id' => 2,
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/aygo.png',
                'descen' => '',
                'descpt' => '',
            ],




            [
                'title' => 'Dacia Sandero III',
                'registration' => 'AT-39-XU',
                'subtitle' => 'Comfort',
                'level_id' => 3,
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/sandero.png',
                'descen' => 'With its robust silhouette, redesigned front end enhanced by the brand\'s new Y-shaped signature LED headlights, the New Sandero reveals its totally renewed design. Inside, with one of the best habitabilities in its category, luggage compartment and generous spaces, it adapts to your everyday life to make your journey even more enjoyable.',
                'descpt' => 'Com a sua silhueta robusta, a dianteira reformulada e realçada pela nova assinatura da marca em forma de Y com faróis LED, o Novo Sandero revela o seu design totalmente renovado. No interior, com uma das melhores habitabilidades da sua categoria, bagageira e espaços generosos, adapta-se ao seu dia a dia para tornar a sua viagem ainda mais agradável.',
            ],
            [
                'title' => 'Renault Clio V',
                'registration' => 'AO-73-DD',
                'subtitle' => 'Intens',
                'level_id' => 3,
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/clio.png',
                'descen' => 'With sensual lines, a dynamic profile, sculpted sides and all new full LED signature lighting. The all NEW CLIO seduces you with style from the first look.',
                'descpt' => 'Linhas sensuais, perfil dinâmico, flancos esculturais e nova assinatura luminosa com iluminação em full LED. Desde o primeiro olhar, o CLIO seduz pelo seu estilo.',
            ],
            [
                'title' => 'Renault Clio V',
                'registration' => 'AO-93-DC',
                'subtitle' => 'Intens',
                'level_id' => 3,
                "visible" => 0,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/clio.png',
                'descen' => '',
                'descpt' => '',
            ],
            [
                'title' => 'Renault Clio V',
                'registration' => 'AO-51-DD',
                'subtitle' => 'Intens',
                'level_id' => 3,
                "visible" => 0,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/clio.png',
                'descen' => '',
                'descpt' => '',
            ],
            [
                'title' => 'Peugeot 208',
                'subtitle' => 'Active',
                'level_id' => 3,
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/208.png',
                'descen' => '',
                'descpt' => '',
            ],




            [
                'title' => 'Dacia Sandero III Stepway',
                'subtitle' => 'Comfort',
                'registration' => 'AT-60-IQ',
                'level_id' => 4,
                "visible" => 1,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/daciastep.png',
                'descen' => 'With an imposing silhouette, straight, horizontal lines, a new Y-shaped LED light signature and high ground clearance. The New Sandero Stepway reveals its completely redesigned design and reaffirms its crossover style. Inside, settle into a generous and multipurpose space to live out your adventures in 100% comfort.',
                'descpt' => 'Com uma silhueta imponente, linhas direitas e horizontais, nova assinatura luminosa da marca em LED em forma de Y e distância ao solo elevada. O Novo Sandero Stepway revela o seu design totalmente remodelado e reafirma o seu estilo de crossover. No interior, instale-se num espaço generoso e polivalente para viver as suas aventuras com 100% de conforto.',
            ],
            [
                'title' => 'Dacia Sandero III Stepway',
                'subtitle' => 'Comfort',
                'registration' => 'AT-94-IQ',
                'level_id' => 4,
                "visible" => 0,
                'gas' => 'gasoline', 'people' => 5, 'doors' => 5, 'shift_mode' => 'manual', 'air' => 1,
                'image' => '/image/garage/daciastep.png',
                'descen' => '',
                'descpt' => '',
            ],

        ];

        foreach ($cars as $item) {
            Car::create([
                'title' => $item["title"],
                'subtitle' => $item["subtitle"],
                'status' => true,
                'registration' => array_key_exists('registration', $item) ? $item["registration"] : null,
                'level_id' => $item["level_id"],
                "visible" => $item["visible"],
                'gas' => $item["gas"], 'people' => $item["people"], 'doors' => $item["doors"], 'shift_mode' => $item["shift_mode"], 'air' => $item["air"],
                'image' => $item["image"],
                'description' => [
                    'en' => $item["descen"],
                    'pt' => $item["descpt"]
                ],
            ]);
        }
    }
}
