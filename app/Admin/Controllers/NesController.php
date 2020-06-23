<?php

namespace App\Admin\Controllers;

use App\Models\Nes;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class NesController extends AdminController
{

    protected $title = 'NES';


    protected function grid()
    {
        $grid = new Grid(new Nes);

        $grid->column('id', __('ID'))->sortable();
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));

        return $grid;
    }

    protected function form()
    {
        $form = new Form(new Nes);

        $form->display('id', __('ID'));
        $form->text('name', __('游戏名'))->rules('required');
        $form->image('pic', __('图片'))->rules('required');
        $form->file('game', __('nes上传'))->rules('required');
        $form->display('created_at', __('Created At'));
        $form->display('updated_at', __('Updated At'));

        return $form;
    }
}
