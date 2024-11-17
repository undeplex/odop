import React from 'react'
import { useState } from 'react';
export default function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-1sss my-4 rounded-2xl">
        <h1 className="text-4xl play text-center my-6 font-bold ">FAQ</h1>
                  <div className="">
        {[
          { title: "QUI SOMMES NOUS", content:<div className="p text-s">La pyrométrie optique est une méthode de mesure de la température basée sur la relation 
            entre la <i>température d'un objet</i> et le rayonnement optique <b><u>(infrarouge ou visible)</u></b> émis par 
            cet objet. Ainsi, les capteurs utilisés sont des capteurs optiques, photoélectriques ou 
            thermiques. Le but de la <b>pyrométrie optique</b>  est de permettre de déterminer la température 
            sans toucher l'objet</div>  },
          { title: "COMMENT COMMANDER", content: <div className="">
            Il y a également des plateformes permettant de faire des
téléchargements libres de contenus numériques.
En dépit de leur grande valeur de vulgarisation, les sources
Wiki ne peuvent pas être considérés comme des sources
scientifiques de rédactions, elles souffrent du non censure
de leur contenu par une communauté scientifique attitrée.
Par ailleurs les Wiki offrent une large ouverture à la
recherche par leur riche bibliographie.
2. Des sources non documentaires ou média graphiques :
les films, les interviews, les enregistrements sonores et ou
audio-vidéos, les objets d’arts, les émissions radio-télévisée
et autres.
          </div> },
          { title: "CONCERNANT LA GARANTIE", content: <div className="">
            Aussi appelé méta-moteur, ce type de recherche
s’effectue au-delà des moteurs de recherche et
consiste à faire des recherches simultanées et
parallèles dans différents moteurs de recherches
simple dans le but d/’avoir un résultat rapide et
compact en recevant les 10 à 50 premières réponses
de chaque moteur de recherche ainsi que leurs
noms ; les compilent en éliminant les réponses en
double pour éviter toute redondance
          </div> },
          { title: "QUI PEUT DEVENIR MEMBRE", content: <div className="">
             l’inverse, il arrive aussi que des informations
traitant d’un même sujet soient présentées en
des endroits épars et apparemment fortuits du
mémoire.
Plusieurs aspects reviennent également sous
divers titres en des endroits divers du texte et à
aucun moment ne font l’objet d’une discussion
critique
          </div> },
          { title: "POURQUOI DEVENIR MEMBRE", content: <div className="">
             l’inverse, il arrive aussi que des informations
traitant d’un même sujet soient présentées en
des endroits épars et apparemment fortuits du
mémoire.
Plusieurs aspects reviennent également sous
divers titres en des endroits divers du texte et à
aucun moment ne font l’objet d’une discussion
critique
          </div> },
          { title: "OU SONT FABRIQUER LES PRODUITS DE LONGRICH", content: <div className="">
             l’inverse, il arrive aussi que des informations
traitant d’un même sujet soient présentées en
des endroits épars et apparemment fortuits du
mémoire.
Plusieurs aspects reviennent également sous
divers titres en des endroits divers du texte et à
aucun moment ne font l’objet d’une discussion
critique
          </div> },
        ].map((section, index) => (
          <div key={index} className="border-b ">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left my-2 focus:outline-none hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex justify-between items-center px-1">
                <span className="font-bold">{section.title}</span>
                    {activeIndex === index && <div className="text-2xl te font-bold">-</div>}
                    {activeIndex !== index && <div className="text-2xl te font-bold">+</div>}
              </div>
            </button>
            <div
              className={`overflow-hidden  text-gray-700 text-[15px] transition-[max-height] duration-500 ease-in-out ${
                activeIndex === index ? "max-h-[630px]" : "max-h-0"
              }`}
            >
               <div className="py-1 px-2">
                {section.content}
              </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
