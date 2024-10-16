<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ContactController extends AbstractController
{
    #[Route('/contacts', name: 'contact_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $contact = new Contact();
        $contact->setName($data['name']);
        $contact->setEmail($data['email']);
        $contact->setMessage($data['message']);

        $entityManager->persist($contact);
        $entityManager->flush();

        return $this->json($contact, Response::HTTP_CREATED);
    }

    #[Route('/contacts', name: 'contact_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $contacts = $entityManager->getRepository(Contact::class)->findAll();
        return $this->json($contacts);
    }
}