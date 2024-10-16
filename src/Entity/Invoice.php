<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ApiResource]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Intervention::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $intervention;

    #[ORM\Column(type: 'float')]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero]
    private $amount;

    #[ORM\Column(type: 'datetime')]
    private $issueDate;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $paidDate;

    #[ORM\Column(type: 'string', length: 255)]
    private $status;

    // Getters and setters
    // ...
}