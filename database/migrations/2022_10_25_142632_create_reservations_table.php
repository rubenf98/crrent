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
            $table->string('rent_contract')->nullable();
            $table->string('payment_method')->nullable();
            $table->datetime('pickup_date');
            $table->datetime('return_date');
            $table->string('pickup_place');
            $table->string('return_place');
            $table->string('flight')->nullable();
            $table->string('address')->nullable();
            $table->double('price', 6, 2);
            $table->double('car_price', 5, 2);
            $table->double('car_price_per_day', 5, 2);

            $table->string('kms_pickup')->nullable();
            $table->string('kms_return')->nullable();
            $table->string('gas_pickup')->nullable();
            $table->string('gas_return')->nullable();

            $table->integer('days');
            $table->text('notes')->nullable();
            $table->unsignedBigInteger("card_id")->nullable();
            $table->unsignedBigInteger("comission_id")->nullable();
            $table->unsignedBigInteger("insurance_id")->nullable();
            $table->unsignedBigInteger("car_id")->nullable();
            $table->unsignedBigInteger("car_pref_id")->nullable();
            $table->unsignedBigInteger("client_id")->nullable();
            $table->datetime('confirmed_at')->nullable();
            $table->datetime('payed_at')->nullable();
            $table->datetime('checkin')->nullable();
            $table->datetime('checkout')->nullable();
            $table->boolean('archive')->default(false);
            $table->string('status')->default('pendente');
            $table->string('current_status')->default('Pendente de levantamento');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign("insurance_id")->references("id")->on("insurances")->onDelete("set null");
            $table->foreign("car_pref_id")->references("id")->on("cars")->onDelete("set null");
            $table->foreign("car_id")->references("id")->on("cars")->onDelete("set null");
            $table->foreign("comission_id")->references("id")->on("comissions")->onDelete("set null");
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
