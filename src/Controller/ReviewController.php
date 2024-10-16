<?php

namespace App\Controller;

use App\Entity\Review;
use App\Entity\Intervention;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ReviewController extends AbstractController
{
    #[Route('/reviews', name: 'review_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $reviews = $entityManager->getRepository(Review::class)->findAll();
        return $this->json($reviews);
    }

    #[Route('/reviews', name: 'review_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $review = new Review();
        $intervention = $entityManager->getRepository(Intervention::class)->find($data['interventionId']);

        if (!$intervention) {
            return $this->json(['message' => 'Intervention not found'], Response::HTTP_NOT_FOUND);
        }

        $review->setIntervention($intervention);
        $review->setRating($data['rating']);
        $review->setComment($data['comment'] ?? null);
        $review->setCreatedAt(new \DateTime());

        $entityManager->persist($review);
        $entityManager->flush();

        return $this->json($review, Response::HTTP_CREATED);
    }

    #[Route('/reviews/{id}', name: 'review_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $review = $entityManager->getRepository(Review::class)->find($id);

        if (!$review) {
            return $this->json(['message' => 'Review not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($review);
    }

    #[Route('/reviews/{id}', name: 'review_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $review = $entityManager->getRepository(Review::class)->find($id);

        if (!$review) {
            return $this->json(['message' => 'Review not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $review->setRating($data['rating'] ?? $review->getRating());
        $review->setComment($data['comment'] ?? $review->getComment());

        $entityManager->flush();

        return $this->json($review);
    }

    #[Route('/reviews/{id}', name: 'review_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $review = $entityManager->getRepository(Review::class)->find($id);

        if (!$review) {
            return $this->json(['message' => 'Review not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($review);
        $entityManager->flush();

        return $this->json(['message' => 'Review deleted successfully']);
    }
}