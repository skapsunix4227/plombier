<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Entity\Intervention;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class InvoiceController extends AbstractController
{
    #[Route('/invoices', name: 'invoice_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $invoices = $entityManager->getRepository(Invoice::class)->findAll();
        return $this->json($invoices);
    }

    #[Route('/invoices', name: 'invoice_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $invoice = new Invoice();
        $intervention = $entityManager->getRepository(Intervention::class)->find($data['interventionId']);

        if (!$intervention) {
            return $this->json(['message' => 'Intervention not found'], Response::HTTP_NOT_FOUND);
        }

        $invoice->setIntervention($intervention);
        $invoice->setAmount($data['amount']);
        $invoice->setIssueDate(new \DateTime());
        $invoice->setStatus('Pending');

        $entityManager->persist($invoice);
        $entityManager->flush();

        return $this->json($invoice, Response::HTTP_CREATED);
    }

    #[Route('/invoices/{id}', name: 'invoice_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $invoice = $entityManager->getRepository(Invoice::class)->find($id);

        if (!$invoice) {
            return $this->json(['message' => 'Invoice not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($invoice);
    }

    #[Route('/invoices/{id}', name: 'invoice_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $invoice = $entityManager->getRepository(Invoice::class)->find($id);

        if (!$invoice) {
            return $this->json(['message' => 'Invoice not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $invoice->setAmount($data['amount'] ?? $invoice->getAmount());
        $invoice->setStatus($data['status'] ?? $invoice->getStatus());

        if (isset($data['paidDate'])) {
            $invoice->setPaidDate(new \DateTime($data['paidDate']));
        }

        $entityManager->flush();

        return $this->json($invoice);
    }

    #[Route('/invoices/{id}', name: 'invoice_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $invoice = $entityManager->getRepository(Invoice::class)->find($id);

        if (!$invoice) {
            return $this->json(['message' => 'Invoice not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($invoice);
        $entityManager->flush();

        return $this->json(['message' => 'Invoice deleted successfully']);
    }
}