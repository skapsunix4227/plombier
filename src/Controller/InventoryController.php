<?php

namespace App\Controller;

use App\Entity\Inventory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class InventoryController extends AbstractController
{
    #[Route('/inventory', name: 'inventory_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $inventoryItems = $entityManager->getRepository(Inventory::class)->findAll();
        return $this->json($inventoryItems);
    }

    #[Route('/inventory', name: 'inventory_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $inventoryItem = new Inventory();
        $inventoryItem->setItemName($data['itemName']);
        $inventoryItem->setQuantity($data['quantity']);
        $inventoryItem->setUnitPrice($data['unitPrice']);
        $inventoryItem->setSupplier($data['supplier']);

        $entityManager->persist($inventoryItem);
        $entityManager->flush();

        return $this->json($inventoryItem, Response::HTTP_CREATED);
    }

    #[Route('/inventory/{id}', name: 'inventory_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $inventoryItem = $entityManager->getRepository(Inventory::class)->find($id);

        if (!$inventoryItem) {
            return $this->json(['message' => 'Inventory item not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($inventoryItem);
    }

    #[Route('/inventory/{id}', name: 'inventory_update', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $inventoryItem = $entityManager->getRepository(Inventory::class)->find($id);

        if (!$inventoryItem) {
            return $this->json(['message' => 'Inventory item not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $inventoryItem->setItemName($data['itemName']);
        $inventoryItem->setQuantity($data['quantity']);
        $inventoryItem->setUnitPrice($data['unitPrice']);
        $inventoryItem->setSupplier($data['supplier']);

        $entityManager->flush();

        return $this->json($inventoryItem);
    }

    #[Route('/inventory/{id}', name: 'inventory_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $inventoryItem = $entityManager->getRepository(Inventory::class)->find($id);

        if (!$inventoryItem) {
            return $this->json(['message' => 'Inventory item not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($inventoryItem);
        $entityManager->flush();

        return $this->json(['message' => 'Inventory item deleted successfully']);
    }
}