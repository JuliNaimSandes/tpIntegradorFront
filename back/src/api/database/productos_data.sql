-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-07-2025 a las 19:08:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL,
  `category` enum('suplemento','equipamiento') NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`) VALUES
(1, 'Proteina ', 'https://imgs.search.brave.com/g_HZ2mUWqiJTueL4nphfoEUi5fu4NqT2YIh1QCNcqI4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVtdXNjdWxvcy5j/b20vd2ViL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI0LzAzLzEt/c295LXByb3RlaW4t/cHVsdmVyLTEta2ct/cHJvdGVpbmEtc29q/YS0wMS5qcGc', 'suplemento', 30000),
(2, 'Creatina', 'https://imgs.search.brave.com/jLbVPgzSOmLIhYLqnGNzL1tZbCufbO_sj9VWklbaqa8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZmFybWFjaWFsZWxv/aXIuY29tLmFyL2lt/Zy9hcnRpY3Vsb3Mv/MjAyNC8xMi9pbWFn/ZW4xX3N0YXJfbnV0/cml0aW9uX2NyZWF0/aW5hX21vbm9oaWRy/YXRvX3hfMzAwX2dy/YW1vc190aHVtYjEu/anBn', 'suplemento', 25000),
(3, 'Aminoacidos', 'https://imgs.search.brave.com/8nPB1yft50j-oFlCUZbEkUm0N3fYtDYqmKrVbJjD2lg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3Mjk0OC1NTEE4/NDg0OTEwMTMzMV8w/NTIwMjUtVi53ZWJw', 'suplemento', 23000),
(4, 'Pre-entreno', 'https://imgs.search.brave.com/mOIN2XdXgHC5WWFKEtQKLzlt63Cf82JPs7iDz-Su_lM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFoREVWemd0ekwu/anBn', 'suplemento', 19000),
(5, 'Multivitaminico', 'https://imgs.search.brave.com/_q8ObfknV_lkmUlZPGs5Lv4v_XpHF5yF0Iq2P98Vy-I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzcyODgwNy1NTFU3/MjgyODA3NTYxM18x/MTIwMjMtVi53ZWJw', 'suplemento', 12000),
(6, 'Omega-3', 'https://imgs.search.brave.com/HPj_o3ptZ_uF2KjR6YFKha1wIg9RPZbSLn7LJJ2a6zU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzc3NzE2Mi1NTEE4/MDA1MDQyODQ3Ml8x/MDIwMjQtVi53ZWJw', 'suplemento', 7000),
(7, 'Magnesio', 'https://imgs.search.brave.com/Vusi_E4otDiOPTj5s2JldPdYrxud2u25GYPBvfhNlxE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGFy/bnV0cml0aW9uLmNv/bS5hci9jZG4vc2hv/cC9maWxlcy9DRE1B/R05FU0lPTkVXNTAw/Zy5wbmc_dj0xNzM1/MjE5MDY0JndpZHRo/PTE1MDA', 'suplemento', 10000),
(8, 'Barrita proteica', 'https://imgs.search.brave.com/lKs-HsJSOHu9eEtOTAHk2trxlROAfdBeH0vKt8cHXAw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aGVyYm9sYXJpb25h/dmFycm8uZXMvbWVk/aWEvY2F0YWxvZy9w/cm9kdWN0LzIvMi8y/MjUwNTAwMl8xLmpw/Zz9xdWFsaXR5PTgw/JmJnLWNvbG9yPTI1/NSwyNTUsMjU1JmZp/dD1ib3VuZHMmaGVp/Z2h0PTEyODAmd2lk/dGg9MTI4MCZjYW52/YXM9MTI4MDoxMjgw', 'suplemento', 3000),
(9, 'Barrita energetica', 'https://imgs.search.brave.com/wlifuRjm3CumKSOfNaUt5Y5x-bpvuZM6s1t0046dm0E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9udXRy/aXNwb3J0LmVzLzgy/OS1ob21lX2RlZmF1/bHQvbnV0LWJhci1j/aW5hbS00OWctZW5l/cmctY2luLXJsbC1l/eHAtMXgyNC5qcGc', 'suplemento', 4000),
(10, 'Quemador', 'https://imgs.search.brave.com/Hw1UhoYCZJeZjsPPWA9km9xpnblkyBOz_SJoSIic734/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3OTQ4Mi1NTEE3/MDU5MjI3MzQ4OV8w/NzIwMjMtRS53ZWJw', 'suplemento', 15000),
(11, 'Mancuernas', 'https://imgs.search.brave.com/LaW2iQbdjJCInNFCtCTrcLJZNX8wENbuWLk044WGEFE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk5Njc5MC1NTEE0/MjUwMzY1NzE4N18w/NzIwMjAtRS53ZWJw', 'equipamiento', 25000),
(12, 'Colchoneta', 'https://imgs.search.brave.com/S2F140JXTbdKyshOJjBe5pi5t3r4tQD7wMp_UBxGVwU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/YmlsbG93c2hvcC5j/b20vNTg2ZDZjYTEt/YWNlMC1lYjI3LTll/MGItMmQwZDNjM2M2/MDYyL2ltZy9Qcm9k/dWN0by8yODgxLzQx/MjAyMC02MzIxMGQx/YjIyYTA0LmpwZWc', 'equipamiento', 9000),
(13, 'Cinturon de levantamiento', 'https://imgs.search.brave.com/ROD8DvjHKEx-xntBpojg-KSHotOx0XwpL3DFzy6lAlw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxNzk5YnpVOUhM/LmpwZw', 'equipamiento', 16000),
(14, 'Barra olimpica', 'https://imgs.search.brave.com/LBf6XcvWjK4MjB_aUUXdXfr-D9BGZZW5kdd0Sy4udcQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzkwNDM0Ni1NUEUz/MjkyMzI0ODEwOF8x/MTIwMTktRS1iYXJy/YS1yZWN0YS1vbGlt/cGljYS1wcm9mZXNp/b25hbC0xMjBtLTIt/c2VndXJvcy53ZWJw', 'equipamiento', 55000),
(15, 'Chaleco', 'https://imgs.search.brave.com/5u7Vf-AhURrPchrWT2BHWKNvtYaNnMrmv2KtaLqPO8c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS5teC9tZy9n/bS8zcHAvYXNyLzQ0/YjIxOThiLWNjYWIt/NDNiNy1iMzMzLWEz/YjBkZTUwNWQyNS4z/Mjc2OTM1Mzc3OWYw/MTZkY2JkYjBkYjlh/MmY4N2I5Ni5qcGVn/P29kbkhlaWdodD02/MTImb2RuV2lkdGg9/NjEyJm9kbkJnPUZG/RkZGRg', '', 46000),
(16, 'Banda elastica', 'https://imgs.search.brave.com/h_u-PPaC3sqvEzdhLs6a65RCEZFfkmlFJWn9eGuutjI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9neW1i/ZWFtLnJvL21lZGlh/L2NhdGFsb2cvcHJv/ZHVjdC9nL3UvZ3Vt/YV9uYV9jdmlfZW5p/ZV8xLnBuZw', '', 5500),
(17, 'Guantes entrenamiento', 'https://imgs.search.brave.com/-osANpFKX5IeCeE6ZezseQMIlg5J8Ao6c1mcqgzYrJA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY0ODg2Ny1NTEE4/NDkzMDY0ODYyN18w/NTIwMjUtRS53ZWJw', 'equipamiento', 12000),
(18, 'Banco step', 'https://imgs.search.brave.com/npXnA2EVHGPY-dNFP6Nexa8GfylakcTkISPUdue86Ck/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFLaHNLZGJ4bFMu/anBn', 'equipamiento', 38000),
(19, 'Kettlebell', 'https://imgs.search.brave.com/F2ktncybYDvg9MrHEot9_Yi4WrSSzdQFTkMUmZ3PZAk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvY2xv/c2UtdXAtZ3JleS1r/ZXR0bGViZWxsXzIz/LTIxNTE4NjcyNzQu/anBnP3NlbXQ9YWlz/X2l0ZW1zX2Jvb3N0/ZWQmdz03NDA', 'equipamiento', 49000),
(20, 'Barra pull-up', 'https://imgs.search.brave.com/vdDxXqOskGDh37c3MpfDwiLSB5j50wxzQvcvVLcKxRk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFJUWJ3S0g5V0wu/anBn', 'equipamiento', 75000),
(21, 'Cinturon lastre', 'https://imgs.search.brave.com/YeFIEERGsLcJOEaZpXskWcum4ptV1aeHceCN6onJB8Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbXBv/cGxhbmV0LmNsL2Nk/bi9zaG9wL2ZpbGVz/L0NMLTE1NV8tX0NJ/TlRVUk9OX0NPTl9D/QURFTkFTXy1fNy5q/cGc_dj0xNzQxNjMx/MDkyJndpZHRoPTE0/NDU', '', 35000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;