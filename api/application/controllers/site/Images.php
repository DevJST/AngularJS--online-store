<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller {

	public function get( $id ) {
     
        $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
        $basePath .= $id . DIRECTORY_SEPARATOR;
   
        if ( !is_dir( $basePath ) ) {
            return;
        }
        
        $files = scandir( $basePath );
        $files = array_diff( $files, array( '.', '..' ) );
        
        $files = array_values($files);
        
        echo json_encode($files);
    }
}