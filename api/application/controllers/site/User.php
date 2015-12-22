<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {
    public function __construct() {       
        parent::__construct();
        
        $post = file_get_contents( 'php://input' );
        $_POST = json_decode( $post , true );

        $this->load->model( 'site/UserModel' );

        $this->form_validation->set_error_delimiters( '', '' );
    }

    public function addUser() {       
        $this->form_validation->set_rules( 'name', 'imię', 'required|min_length[3]' );
        $this->form_validation->set_rules( 'email', 'email', 'required|valid_email|is_unique[users.email]' );
        $this->form_validation->set_rules( 'password', 'hasło', 'required|min_length[3]|matches[passconf]' );
        $this->form_validation->set_rules( 'passconf', 'powtórz hasło', 'required|min_length[3]' );

        if( $this->form_validation->run() ) {
            $this->UserModel->addUser( array( 
                'name' => $this->input->post( 'name' ),
                'email' => $this->input->post( 'email' ),
                'password' => crypt( $this->input->post( 'password' ), config_item( 'encryption_key' )),
                'role' => 'user' 
            ));            
        } else {
            $errors['name'] = form_error( 'name' );
            $errors['email'] = form_error( 'email' );
            $errors['password'] = form_error( 'password' );
            $errors['passconf'] = form_error( 'passconf' );

            echo json_encode( $errors );
        } 
    } 

    public function login() {
        $email = $this->input->post( 'email' );
        $password = crypt( $this->input->post( 'password' ), config_item( 'encryption_key' ));

        $loginData = $this->UserModel->login( $email, $password );
        $output = array();

        if ( $loginData[ 'success' ] === true ) {
            $output[ 'user' ] = $this->jwt->encode( array(
                'userId' => $loginData['user']->userId,
                'name' => $loginData['user']->name,
                'email' => $loginData['user']->email,
                'role' => $loginData['user']->role
            ), config_item( 'encryption_key' )); 
        } else {
            $output[ 'error' ] = $loginData[ 'error' ];
        }

        echo json_encode( $output );
    }
}