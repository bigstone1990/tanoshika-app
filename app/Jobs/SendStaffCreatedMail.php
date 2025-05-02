<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Mail\StaffCreatedMail;

class SendStaffCreatedMail implements ShouldQueue
{
    use Queueable;

    public $staff;
    public $password;

    /**
     * Create a new job instance.
     */
    public function __construct($staff, $password)
    {
        $this->staff = $staff;
        $this->password = $password;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->staff)->send(new StaffCreatedMail($this->staff, $this->password));
    }
}
