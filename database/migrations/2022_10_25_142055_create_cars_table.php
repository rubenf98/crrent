<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('registration')->nullable()->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->boolean('visible');
            $table->boolean('status')->default(false);
            $table->text('description')->nullable();
            $table->string('gas');
            $table->integer('people');
            $table->integer('air');
            $table->integer('doors');
            $table->string('shift_mode');
            $table->string('image')->nullable();
            $table->unsignedBigInteger("level_id");
            $table->timestamps();

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
        Schema::dropIfExists('cars');
    }
}
