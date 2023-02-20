<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromotionHasLevelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotion_has_levels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("level_id");
            $table->unsignedBigInteger("promotion_id");
            $table->timestamps();

            $table->foreign("level_id")->references("id")->on("levels")->onDelete("cascade");
            $table->foreign("promotion_id")->references("id")->on("promotions")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotion_has_levels');
    }
}
