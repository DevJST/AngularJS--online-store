<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller {
    
	public function upload( $id ) {

        if ( !empty( $_FILES ) ) {
            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            
            $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
            $basePath .= $id . DIRECTORY_SEPARATOR;
            
            $oldmask = umask(0);
            mkdir( $basePath , 0770 );
            umask($oldmask);
            
            $uploadPath = $basePath . $_FILES[ 'file' ][ 'name' ]; 
            move_uploaded_file( $tempPath, $uploadPath );
            
            $answer = array( 'answer' => 'File transfer completed' );
            $json = json_encode( $answer );
            echo $json;
        } else {
            echo 'No files';
        }
	} 
    
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
    
    public function delete() {
        
        $post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );
		
		$productId = $this->input->post( 'id' );
        $imageName = $this->input->post( 'name' );
        
        $imagePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
        $imagePath .= $productId . DIRECTORY_SEPARATOR . $imageName;

        unlink( $imagePath );
    }
}