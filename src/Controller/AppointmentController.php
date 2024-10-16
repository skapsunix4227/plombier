<?php

namespace App\Controller;

use App\Entity\Appointment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class AppointmentController extends AbstractController
{
    #[Route('/appointments', name: 'appointment_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $appointments = $entityManager->getRepository(Appointment::class)->findAll();
        return $this->json($appointments);
    }

    #[Route('/appointments', name: 'appointment_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $appointment = new Appointment();
        $appointment->setName($data['name']);
        $appointment->setEmail($data['email']);
        $appointment->setPhone($data['phone']);
        $appointment->setDate(new \DateTime($data['date']));
        $appointment->setService($data['service']);

        $entityManager->persist($appointment);
        $entityManager->flush();

        return $this->json($appointment, Response::HTTP_CREATED);
    }

    #[Route('/appointments/{id}', name: 'appointment_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $appointment = $entityManager->getRepository(Appointment::class)->find($id);

        if (!$appointment) {
            return $this->json(['message' => 'Appointment not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($appointment);
    }
}