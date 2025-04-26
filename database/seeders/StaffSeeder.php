<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('staff')->insert([
            [
                'user_id' => 1,
                'name' => 'スタッフ1',
                'kana' => 'すたっふいち',
                'email' => 'staff1@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'スタッフ2',
                'kana' => 'すたっふに',
                'email' => 'staff2@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'スタッフ3',
                'kana' => 'すたっふさん',
                'email' => 'staff3@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'スタッフ4',
                'kana' => 'すたっふよん',
                'email' => 'staff4@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'スタッフ5',
                'kana' => 'すたっふご',
                'email' => 'staff5@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 2,
                'name' => 'スタッフ6',
                'kana' => 'すたっふろく',
                'email' => 'staff6@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 2,
                'name' => 'スタッフ7',
                'kana' => 'すたっふなな',
                'email' => 'staff7@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 2,
                'name' => 'スタッフ8',
                'kana' => 'すたっふはち',
                'email' => 'staff8@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 3,
                'name' => 'スタッフ9',
                'kana' => 'すたっふきゅう',
                'email' => 'staff9@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 3,
                'name' => 'スタッフ10',
                'kana' => 'すたっふじゅう',
                'email' => 'staff10@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'スタッフ11',
                'kana' => 'すたっふじゅういち',
                'email' => 'staff11@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'スタッフ12',
                'kana' => 'すたっふじゅうに',
                'email' => 'staff12@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'スタッフ13',
                'kana' => 'すたっふじゅうさん',
                'email' => 'staff13@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'スタッフ14',
                'kana' => 'すたっふじゅうよん',
                'email' => 'staff14@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'スタッフ15',
                'kana' => 'すたっふじゅうご',
                'email' => 'staff15@test.com',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
