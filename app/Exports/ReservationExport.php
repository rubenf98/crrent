<?php

namespace App\Exports;

use App\Models\Reservation;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class ReservationExport implements FromCollection, WithHeadings, WithMapping, WithTitle
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */

    public function collection()
    {
        return Reservation::all();
    }

    public function headings(): array
    {

        return [
            'ID',
            'Data da reserva',
            'Data entrega',
            'Local entrega',
            'Data devolução',
            'Local devolução',
            'Matrícula',
            'Viatura',

            'Km entrega',
            'Combustivel entrega',
            'Km Devolução',
            'Combustivel devolução',

            'Nome',
            'Morada local',
            'Telefone',
            'Email',
            'Cartão de cidadão / Passaporte',
            'NIF',
            'País',

            'Nº dias',
            'P.U',
            'Valor aluguer',
            'Valor Extras/Seguro',
            'Total',
            'Comissão',
            'Lucro',

            'Morada da estadia',
            'Hotel/agência',
            'Reservado por',
            'Método de pagamento',
            'Obs.'
        ];
    }

    public function map($record): array
    {
        return [
            $record->id,
            $record->created_at,
            $record->pickup_date,
            $record->pickup_place,
            $record->return_date,
            $record->return_place,
            $record->car->registration,
            $record->car->category->title,

            $record->kms_pickup,
            $record->gas_pickup,
            $record->kms_return,
            $record->gas_return,

            $record->client->name,
            $record->client->address,
            $record->client->phone,
            $record->client->email,
            $record->client->cc,
            $record->client->nif,
            $record->client->country,

            $record->days,
            str_replace(',', '.', $record->car_price_per_day),
            str_replace(',', '.', $record->car_price),
            str_replace(',', '.', $record->price - $record->car_price),
            str_replace(',', '.', $record->price),
            str_replace(',', '.', $record->comission ? $record->comission->value : 0),
            str_replace(',', '.', $record->price - ($record->comission ? $record->comission->value : 0)),

            $record->address,
            $record->comission ? $record->comission->agency->name : "",
            $record->comission ? $record->comission->intermediary : "",
            $record->payment_method,
            $record->notes,
        ];
    }

    public function title(): string
    {
        return 'Reservas';
    }
}
