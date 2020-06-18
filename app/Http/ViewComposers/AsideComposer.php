<?php

namespace App\Http\ViewComposers;

use App\Models\AdminUser;
use Illuminate\View\View;

class AsideComposer
{
    protected  $adminUser;
    public function __construct(AdminUser  $adminUser)
    {
        $this->adminUser = $adminUser;
    }

    public function compose(View $view)
    {
        $admin_user = $this->adminUser->getAdmin();
        $view->with('admin_user',  $admin_user);
    }

}
