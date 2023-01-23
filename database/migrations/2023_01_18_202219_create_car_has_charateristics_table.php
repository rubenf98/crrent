<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarHasCharateristicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_has_charateristics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("car_category_id");
            $table->unsignedBigInteger("car_charateristic_id");
            $table->string('value')->nullable();
            $table->timestamps();

            $table->foreign("car_category_id")->references("id")->on("car_categories")->onDelete("cascade");
            $table->foreign("car_charateristic_id")->references("id")->on("car_charateristics")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_has_charateristics');
    }
}
