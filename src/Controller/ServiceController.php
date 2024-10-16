<?php

namespace App\Controller;

use App\Entity\Service;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ServiceController extends AbstractController
{
    #[Route('/services', name: 'service_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $services = $entityManager->getRepository(Service::class)->findAll();
        return $this->json($services);
    }

    #[Route('/services', name: 'service_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $service = new Service();
        $service->setName($data['name']);
        $service->setDescription($data['description']);
        $service->setBasePrice($data['basePrice']);
        $service->setDuration($data['duration']);

        $entityManager->persist($service);
        $entityManager->flush();

        return $this->json($service, Response::HTTP_CREATED);
    }

    #[Route('/services/{id}', name: 'service_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $service = $entityManager->getRepository(Service::class)->find($id);

        if (!$service) {
            return $this->json(['message' => 'Service not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($service);
    }

    #[Route('/services/{id}', name: 'service_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $service = $entityManager->getRepository(Service::class)->find($id);

        if (!$service) {
            return $this->json(['message' => 'Service not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $service->setName($data['name']);
        $service->setDescription($data['description']);
        $service->setBasePrice($data['basePrice']);
        $service->setDuration($data['duration']);

        $entityManager->flush();

        return $this->json($service);
    }

    #[Route('/services/{id}', name: 'service_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $service = $entityManager->getRepository(Service::class)->find($id);

        if (!$service) {
            return $this->json(['message' => 'Service not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($service);
        $entityManager->flush();

        return $this->json(['message' => 'Service deleted successfully']);
    }
}