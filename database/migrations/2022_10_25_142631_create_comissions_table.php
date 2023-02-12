<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("agency_id");
            $table->string('intermediary')->nullable();
            $table->double('value', 6, 2)->default(0);
            $table->boolean('paid')->default(false);
            $table->timestamps();

            $table->foreign("agency_id")->references("id")->on("agencies")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comissions');
    }
}
