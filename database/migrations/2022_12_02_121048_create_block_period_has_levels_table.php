<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockPeriodHasLevelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_period_has_levels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("block_period_id");
            $table->unsignedBigInteger("level_id");
            $table->timestamps();

            $table->foreign("block_period_id")->references("id")->on("block_periods")->onDelete("cascade");
            $table->foreign("level_id")->references("id")->on("levels")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('block_period_has_levels');
    }
}
