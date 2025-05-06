<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\MemberCreatedMail;

class SendMemberCreatedMail implements ShouldQueue
{
    use Queueable;

    public $member;
    public $password;

    /**
     * Create a new job instance.
     */
    public function __construct($member, $password)
    {
        $this->member = $member;
        $this->password = $password;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->member)->send(new MemberCreatedMail($this->member, $this->password));
    }
}
