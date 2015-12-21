<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {
    public function __construct() {       
        parent::__construct();
        
        $post = file_get_contents( 'php://input' );
        $_POST = json_decode( $post , true );

        $this->load->model( 'admin/UsersModel' );

        $this->form_validation->set_error_delimiters( '', '' );
    }

    function unique_edited_email() {
        $id = $this->input->post( 'userId' );
        $email = $this->input->post( 'email' );

        if ( $this->UsersModel->getUnique( $id , $email ) )
        {
            $this->form_validation->set_message( 'unique_edited_email' , 'Inny użytkownik ma taki adres e-mail' );
            return false;
        }

        return true;
    }
    
    public function getUsers() {       
        $output = $this->UsersModel->getUsers();
        echo json_encode( $output );
    }

    public function getUser( $id ) {
        $output = $this->UsersModel->getUser( $id );
        echo json_encode( $output );
    }

    public function updateUser() {   
        $this->form_validation->set_rules( 'name', 'imię', 'required|min_length[3]' );
        $this->form_validation->set_rules( 'email', 'email', 'required|valid_email|callback_unique_edited_email' );
        $this->form_validation->set_rules( 'password', 'hasło', 'min_length[3]|matches[passconf]' );
        $this->form_validation->set_rules( 'passconf', 'powtórz hasło', 'min_length[3]' );
        $this->form_validation->set_rules( 'role', 'rola', 'required' );

        if( $this->form_validation->run() === true ) {
            $this->UsersModel->updateUser( array( 
                'userId' => $this->input->post( 'userId' ),
                'name' => $this->input->post( 'name' ),
                'email' => $this->input->post( 'email' ),
                'password' => crypt( $this->input->post( 'password' ), config_item( 'encryption_key' ) ),
                'role' => $this->input->post( 'role' )
            ));            
        } else {
            $errors['name'] = form_error( 'name' );
            $errors['email'] = form_error( 'email' );
            $errors['password'] = form_error( 'password' );
            $errors['passconf'] = form_error( 'passconf' );
            $errors['role'] = form_error( 'role' );
            echo json_encode( $errors );
        } 
    }

    public function createUser() {       
        $this->form_validation->set_rules( 'name', 'imię', 'required|min_length[3]' );
        $this->form_validation->set_rules( 'email', 'email', 'required|valid_email|is_unique[users.email]' );
        $this->form_validation->set_rules( 'password', 'hasło', 'required|min_length[3]|matches[passconf]' );
        $this->form_validation->set_rules( 'passconf', 'powtórz hasło', 'required|min_length[3]' );
        $this->form_validation->set_rules( 'role', 'rola', 'required' );

        if( $this->form_validation->run() ) {
            $this->UsersModel->createUser( array( 
                'name' => $this->input->post( 'name' ),
                'email' => $this->input->post( 'email' ),
                'password' => crypt( $this->input->post( 'password' ), config_item( 'encryption_key' ) ),
                'role' => $this->input->post( 'role' )
            ));            
        } else {
            $errors['name'] = form_error( 'name' );
            $errors['email'] = form_error( 'email' );
            $errors['password'] = form_error( 'password' );
            $errors['passconf'] = form_error( 'passconf' );
            $errors['role'] = form_error( 'role' );
            echo json_encode( $errors );
        } 
    } 

    public function deleteUser() {
        $userId = $this->input->post( 'userId' );
        $this->UsersModel->deleteUser( $userId );
    }
}