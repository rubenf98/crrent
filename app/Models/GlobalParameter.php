<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GlobalParameter extends Model
{
    protected $fillable = ["name", "code", "value"];
}
