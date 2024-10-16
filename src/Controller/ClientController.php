<?php

namespace App\Controller;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ClientController extends AbstractController
{
    #[Route('/clients', name: 'client_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $clients = $entityManager->getRepository(Client::class)->findAll();
        return $this->json($clients);
    }

    #[Route('/clients', name: 'client_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $client = new Client();
        $client->setFirstName($data['firstName']);
        $client->setLastName($data['lastName']);
        $client->setEmail($data['email']);
        $client->setPhone($data['phone']);
        $client->setAddress($data['address']);

        $entityManager->persist($client);
        $entityManager->flush();

        return $this->json($client, Response::HTTP_CREATED);
    }

    #[Route('/clients/{id}', name: 'client_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json(['message' => 'Client not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($client);
    }

    #[Route('/clients/{id}', name: 'client_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json(['message' => 'Client not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $client->setFirstName($data['firstName']);
        $client->setLastName($data['lastName']);
        $client->setEmail($data['email']);
        $client->setPhone($data['phone']);
        $client->setAddress($data['address']);

        $entityManager->flush();

        return $this->json($client);
    }

    #[Route('/clients/{id}', name: 'client_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json(['message' => 'Client not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($client);
        $entityManager->flush();

        return $this->json(['message' => 'Client deleted successfully']);
    }
}