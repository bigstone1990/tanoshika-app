<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('members')->insert([
            [
                'user_id' => 1,
                'name' => 'メンバー1',
                'kana' => 'めんばーいち',
                'email' => 'member1@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー2',
                'kana' => 'めんばーに',
                'email' => 'member2@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー3',
                'kana' => 'めんばーさん',
                'email' => 'member3@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー4',
                'kana' => 'めんばーよん',
                'email' => 'member4@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー5',
                'kana' => 'めんばーご',
                'email' => 'member5@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー6',
                'kana' => 'めんばーろく',
                'email' => 'member6@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー7',
                'kana' => 'めんばーなな',
                'email' => 'member7@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー8',
                'kana' => 'めんばーはち',
                'email' => 'member8@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー9',
                'kana' => 'めんばーきゅう',
                'email' => 'member9@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 1,
                'name' => 'メンバー10',
                'kana' => 'めんばーじゅう',
                'email' => 'member10@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 2,
                'name' => 'メンバー11',
                'kana' => 'めんばーじゅういち',
                'email' => 'member11@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 2,
                'name' => 'メンバー12',
                'kana' => 'めんばーじゅうに',
                'email' => 'member12@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => 2,
                'name' => 'メンバー13',
                'kana' => 'めんばーじゅうさん',
                'email' => 'member13@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'メンバー14',
                'kana' => 'めんばーじゅうよん',
                'email' => 'member14@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'user_id' => null,
                'name' => 'メンバー15',
                'kana' => 'めんばーじゅうご',
                'email' => 'member15@test.com',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
