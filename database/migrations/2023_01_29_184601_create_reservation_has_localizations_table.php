<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationHasLocalizationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation_has_localizations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("reservation_id");
            $table->unsignedBigInteger("localization_id");
            $table->double('price', 5, 2);
            $table->timestamps();

            $table->foreign("reservation_id")->references("id")->on("reservations")->onDelete("cascade");
            $table->foreign("localization_id")->references("id")->on("localizations")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservation_has_localizations');
    }
}
