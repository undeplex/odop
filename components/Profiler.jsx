import Link from 'next/link'
import React from 'react'
import ExpandableText from './ExpendableText';

export default function Profiler() {
    const longText = `
    
Fort d'une solide expérience dans l'univers du web, Pierre est également en charge de toutes les intégrations en matière d'UI/UX (expérience utilisateur et interface utilisateur). Il joue un rôle clé dans l'optimisation des parcours clients, en veillant à ce que chaque point de contact digital reflète l’identité et les valeurs de la marque.
    

Son expertise s'étend à l'implémentation de solutions technologiques innovantes pour améliorer la performance des plateformes en ligne, maximiser l'engagement des utilisateurs, et augmenter la conversion. Polyvalent et axé sur les résultats, Pierre met un point d'honneur à créer des expériences digitales cohérentes et engageantes qui soutiennent la croissance de la marque Doic dans un environnement numérique en constante évolution.
    `;
  return (
    <div className="max-w-md mx-auto">
        <div className="flex gap-3 items-center">
            <img src="/profiler2.jpg" width="100px" className="rounded-full size-[50px] object-cover ring-4 ring-gray-0"/>
            <div>

                <p className="play text-xl">Pierre Nzana</p>
                <p className=" text-sm dark:text-gray-300">#Developper#System Engineer#DevOps#CopyWriter</p>
            </div>
        </div>
        <div className="mt-5 px-3 text-sm">

        Pierre occupe le poste de Brand Executive Officer (BEO) chez Doic LLC, où il supervise la stratégie et le développement de la marque. Il est également responsable de la gestion des actifs numériques de l’entreprise, y compris la création de contenu stratégique (copywriting) pour renforcer la présence en ligne de Doic.
        <ExpandableText content={longText} />
        </div>

   
    </div>
  )
}
