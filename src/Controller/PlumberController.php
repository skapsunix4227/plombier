<?php

namespace App\Controller;

use App\Entity\Plumber;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class PlumberController extends AbstractController
{
    #[Route('/plumbers', name: 'plumber_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $plumbers = $entityManager->getRepository(Plumber::class)->findAll();
        return $this->json($plumbers);
    }

    #[Route('/plumbers', name: 'plumber_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $plumber = new Plumber();
        $plumber->setName($data['name']);
        $plumber->setSkills($data['skills']);
        $plumber->setAvailability($data['availability']);
        $plumber->setEmail($data['email']);
        $plumber->setPhone($data['phone']);

        $entityManager->persist($plumber);
        $entityManager->flush();

        return $this->json($plumber, Response::HTTP_CREATED);
    }

    #[Route('/plumbers/{id}', name: 'plumber_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $plumber = $entityManager->getRepository(Plumber::class)->find($id);

        if (!$plumber) {
            return $this->json(['message' => 'Plumber not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($plumber);
    }

    #[Route('/plumbers/{id}', name: 'plumber_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $plumber = $entityManager->getRepository(Plumber::class)->find($id);

        if (!$plumber) {
            return $this->json(['message' => 'Plumber not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $plumber->setName($data['name']);
        $plumber->setSkills($data['skills']);
        $plumber->setAvailability($data['availability']);
        $plumber->setEmail($data['email']);
        $plumber->setPhone($data['phone']);

        $entityManager->flush();

        return $this->json($plumber);
    }

    #[Route('/plumbers/{id}', name: 'plumber_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $plumber = $entityManager->getRepository(Plumber::class)->find($id);

        if (!$plumber) {
            return $this->json(['message' => 'Plumber not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($plumber);
        $entityManager->flush();

        return $this->json(['message' => 'Plumber deleted successfully']);
    }
}