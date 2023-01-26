<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockedCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blocked_cars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('car_id');
            $table->date('from');
            $table->date('to');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('car_id')->references('id')->on('cars');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocked_cars');
    }
}
