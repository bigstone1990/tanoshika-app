<?php

namespace App\Constants;

class DailyReportConstants {
  const START_WORK_TYPE = [
    'startNormal' => [
      'label' => '10:00（朝礼）',
      'value' => '1',
    ],
    'startOther1' => [
      'label' => 'その他（午前休、遅刻の方はこちら）',
      'value' => '2',
    ],
  ];

  const END_WORK_TYPE = [
    'endNormal' => [
      'label' => '15:20（終礼）',
      'value' => '1',
    ],
    'endOther1' => [
      'label' => 'その他（午後休、早退の方はこちら）',
      'value' => '2',
    ],
    'endOther2' => [
      'label' => 'その他2（5限目はこちら）',
      'value' => '3',
    ],
  ];

  const SCORE_OPTION = [
    'score1' => [
      'label' => '1',
      'value' => '1',
    ],
    'score2' => [
      'label' => '2',
      'value' => '2',
    ],
    'score3' => [
      'label' => '3',
      'value' => '3',
    ],
    'score4' => [
      'label' => '4',
      'value' => '4',
    ],
    'score5' => [
      'label' => '5',
      'value' => '5',
    ],
    'score6' => [
      'label' => '6',
      'value' => '6',
    ],
    'score7' => [
      'label' => '7',
      'value' => '7',
    ],
    'score8' => [
      'label' => '8',
      'value' => '8',
    ],
    'score9' => [
      'label' => '9',
      'value' => '9',
    ],
    'score10' => [
      'label' => '10',
      'value' => '10',
    ],
  ];
}
