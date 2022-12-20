<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('token')->unique();
            $table->datetime('pickup_date');
            $table->datetime('return_date');
            $table->string('pickup_place');
            $table->string('return_place');
            $table->string('flight')->nullable();
            $table->double('price', 5, 2);
            $table->double('car_price', 5, 2);
            $table->double('car_price_per_day', 5, 2);
            $table->integer('days');
            $table->unsignedBigInteger("card_id")->nullable();
            $table->unsignedBigInteger("car_id")->nullable();
            $table->unsignedBigInteger("client_id")->nullable();
            $table->datetime('confirmed_at')->nullable();
            $table->timestamps();

            $table->foreign("car_id")->references("id")->on("cars")->onDelete("set null");
            $table->foreign("card_id")->references("id")->on("cards")->onDelete("set null");
            $table->foreign("client_id")->references("id")->on("clients")->onDelete("set null");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
