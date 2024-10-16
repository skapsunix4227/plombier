<?php

namespace App\Controller;

use App\Entity\Intervention;
use App\Entity\Appointment;
use App\Entity\Plumber;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class InterventionController extends AbstractController
{
    #[Route('/interventions', name: 'intervention_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $interventions = $entityManager->getRepository(Intervention::class)->findAll();
        return $this->json($interventions);
    }

    #[Route('/interventions', name: 'intervention_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $intervention = new Intervention();
        $appointment = $entityManager->getRepository(Appointment::class)->find($data['appointmentId']);
        $plumber = $entityManager->getRepository(Plumber::class)->find($data['plumberId']);

        if (!$appointment || !$plumber) {
            return $this->json(['message' => 'Appointment or Plumber not found'], Response::HTTP_NOT_FOUND);
        }

        $intervention->setAppointment($appointment);
        $intervention->setPlumber($plumber);
        $intervention->setStatus($data['status']);
        $intervention->setNotes($data['notes'] ?? null);
        $intervention->setStartTime(new \DateTime($data['startTime']));
        $intervention->setEndTime(isset($data['endTime']) ? new \DateTime($data['endTime']) : null);

        $entityManager->persist($intervention);
        $entityManager->flush();

        return $this->json($intervention, Response::HTTP_CREATED);
    }

    #[Route('/interventions/{id}', name: 'intervention_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $intervention = $entityManager->getRepository(Intervention::class)->find($id);

        if (!$intervention) {
            return $this->json(['message' => 'Intervention not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($intervention);
    }

    #[Route('/interventions/{id}', name: 'intervention_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $intervention = $entityManager->getRepository(Intervention::class)->find($id);

        if (!$intervention) {
            return $this->json(['message' => 'Intervention not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['appointmentId'])) {
            $appointment = $entityManager->getRepository(Appointment::class)->find($data['appointmentId']);
            if (!$appointment) {
                return $this->json(['message' => 'Appointment not found'], Response::HTTP_NOT_FOUND);
            }
            $intervention->setAppointment($appointment);
        }

        if (isset($data['plumberId'])) {
            $plumber = $entityManager->getRepository(Plumber::class)->find($data['plumberId']);
            if (!$plumber) {
                return $this->json(['message' => 'Plumber not found'], Response::HTTP_NOT_FOUND);
            }
            $intervention->setPlumber($plumber);
        }

        $intervention->setStatus($data['status'] ?? $intervention->getStatus());
        $intervention->setNotes($data['notes'] ?? $intervention->getNotes());
        $intervention->setRating($data['rating'] ?? $intervention->getRating());
        $intervention->setStartTime(isset($data['startTime']) ? new \DateTime($data['startTime']) : $intervention->getStartTime());
        $intervention->setEndTime(isset($data['endTime']) ? new \DateTime($data['endTime']) : $intervention->getEndTime());

        $entityManager->flush();

        return $this->json($intervention);
    }

    #[Route('/interventions/{id}', name: 'intervention_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $intervention = $entityManager->getRepository(Intervention::class)->find($id);

        if (!$intervention) {
            return $this->json(['message' => 'Intervention not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($intervention);
        $entityManager->flush();

        return $this->json(['message' => 'Intervention deleted successfully']);
    }
}