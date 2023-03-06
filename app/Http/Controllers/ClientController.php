<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Models\LogRecord;
use App\QueryFilters\ClientFilters;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(ClientFilters $filters)
    {
        return ClientResource::collection(Client::filterBy($filters)->with('reservations.car')->paginate(10));
    }

    public function show(Client $client)
    {
        return new ClientResource($client);
    }

    public function update(ClientRequest $request, Client $client)
    {
        $validator = $request->validated();

        $client->update($validator);
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou o cliente " . $client->id
        ]);
        return new ClientResource($client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou o cliente " . $client->id
        ]);
        $client->delete();

        return response()->json(null, 204);
    }
}
