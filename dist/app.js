const recipes=[
{id:'salmon',name:'Lemon & herb salmon',sub:'with roasted potatoes & green beans',category:'Fish',time:35,difficulty:'Easy',description:'Golden potatoes, tender salmon, and a generous squeeze of lemon. A fresh take on the sheet-pan supper.',ingredients:[[2,'','salmon fillets (about 150 g each)'],[400,'g','baby potatoes, halved'],[200,'g','green beans, trimmed'],[1,'','lemon'],[2,'tbsp','olive oil'],[2,'tsp','Dijon mustard'],[2,'tbsp','chopped parsley']],steps:['Heat the oven to 425°F (220°C). Toss potatoes with half the oil, salt, and pepper on a sheet pan. Roast for 20 minutes, turning once.','Mix the remaining oil with mustard, half the lemon juice, and parsley. Pat the salmon dry and spread the mixture over the top.','Add salmon and green beans to the pan. Season the beans and roast for 12–15 minutes, until the fish reaches 145°F (63°C) in the thickest part and the potatoes are tender.','Serve with the remaining lemon cut into wedges. Spoon any pan juices over the salmon.'],tip:'Cut the potatoes into evenly sized pieces so they roast at the same rate.'},
{id:'chicken',name:'Coconut curry chicken',sub:'with ginger, spinach & jasmine rice',category:'Chicken',time:30,difficulty:'Easy',description:'A cozy coconut sauce with a little warmth and plenty of bright lime.',ingredients:[[300,'g','boneless chicken thighs, sliced'],[150,'g','jasmine rice'],[200,'ml','coconut milk'],[1,'tbsp','red curry paste'],[1,'tbsp','grated ginger'],[100,'g','baby spinach'],[1,'','lime'],[1,'tbsp','neutral oil']],steps:['Cook the rice according to its package directions. Keep covered while you prepare the curry.','Heat oil in a deep skillet over medium-high heat. Add chicken and cook for 4–5 minutes, turning to brown both sides.','Stir in ginger and curry paste for 1 minute. Pour in coconut milk and 100 ml water per two servings. Simmer gently for 10–12 minutes, until chicken reaches 165°F (74°C).','Fold in spinach until wilted. Add lime juice and salt to taste. Serve over rice.'],tip:'Curry pastes vary in heat. Start with less and add more to suit your table.'},
{id:'risotto',name:'Creamy mushroom risotto',sub:'with Parmesan & fresh thyme',category:'Vegetarian',time:40,difficulty:'A little practice',description:'Slow down, stir a little, and turn a handful of simple ingredients into dinner.',ingredients:[[160,'g','arborio rice'],[250,'g','mushrooms, sliced'],[700,'ml','vegetable stock'],[1,'','small onion, finely diced'],[2,'tbsp','butter'],[40,'g','Parmesan, grated'],[1,'tsp','thyme leaves']],steps:['Warm stock in a saucepan over low heat. In another pan, melt half the butter over medium-high heat and brown mushrooms for 6–8 minutes. Set aside.','Lower heat to medium. Add remaining butter and onion; soften for 5 minutes. Stir in rice and thyme for 1 minute.','Add warm stock a ladle at a time, stirring often and letting each addition mostly absorb before the next. Continue for 18–25 minutes, until rice is tender with a slight bite. Add hot water if more liquid is needed.','Stir in mushrooms and Parmesan. Season with salt and pepper. Add a splash of stock or water for a loose, creamy texture and serve immediately.'],tip:'Keep the stock warm and the rice at a gentle simmer. The finished risotto should flow onto the plate.'},
{id:'soup',name:'Carrot & coriander soup',sub:'with a swirl of cream & crusty bread',category:'Vegetarian',time:35,difficulty:'Easy',description:'A silky, gently spiced bowl of comfort for cooler evenings.',ingredients:[[500,'g','carrots, sliced'],[1,'','onion, chopped'],[1,'tbsp','olive oil'],[1,'tsp','ground coriander'],[600,'ml','vegetable stock'],[2,'tbsp','cream, optional'],[2,'tbsp','fresh coriander leaves']],steps:['Heat oil in a saucepan over medium heat. Cook onion for 5 minutes until softened. Stir in ground coriander for 30 seconds.','Add carrots and stock. Bring to a simmer, cover, and cook for 20–25 minutes, until carrots are very tender.','Remove from heat. Blend carefully with an immersion blender until smooth. Add water to thin as desired and season with salt and pepper.','Ladle into bowls. Finish with cream and fresh coriander, and serve with bread.'],tip:'For batch cooking, freeze the blended soup before adding cream. Add the cream after reheating.'},
{id:'pasta',name:'Tomato & basil pasta',sub:'with garlic & shaved Parmesan',category:'Vegetarian',time:25,difficulty:'Easy',description:'Sweet tomatoes, fragrant basil, and a sauce that comes together while the pasta cooks.',ingredients:[[180,'g','pasta'],[300,'g','cherry tomatoes, halved'],[2,'','garlic cloves, sliced'],[2,'tbsp','olive oil'],[20,'g','Parmesan, grated'],[10,'g','fresh basil']],steps:['Bring a large pot of salted water to a boil. Cook pasta according to the package, reserving a mug of cooking water before draining.','Meanwhile, heat oil over medium heat in a skillet. Add garlic and cook for 30 seconds without browning.','Add tomatoes and a pinch of salt. Simmer for 10–12 minutes, pressing some tomatoes to release their juices.','Toss in pasta with a splash of cooking water. Stir until glossy, then add torn basil and Parmesan. Season and serve.'],tip:'The starchy pasta water helps the olive oil and tomato juices become a silky sauce.'},
{id:'souvlaki',name:'Greek chicken souvlaki',sub:'with cucumber yogurt & warm pita',category:'Chicken',time:30,difficulty:'Easy',description:'Lemony, oregano-scented chicken with cool cucumber yogurt and plenty of crunch.',ingredients:[[300,'g','boneless chicken breast, cubed'],[2,'','pita breads'],[150,'g','plain Greek yogurt'],[0.5,'','cucumber, grated and squeezed dry'],[1,'','lemon'],[2,'tbsp','olive oil'],[1,'tsp','dried oregano'],[1,'','garlic clove, grated']],steps:['Mix oil, oregano, half the garlic, half the lemon juice, salt, and pepper. Toss with chicken. Let stand for 10 minutes while preparing the sauce.','Mix yogurt, cucumber, remaining garlic, and lemon juice to taste. Season with salt.','Heat a grill pan or skillet over medium-high heat. Cook chicken for 8–12 minutes, turning often, until the center reaches 165°F (74°C).','Warm pita in a dry pan. Serve with chicken and cucumber yogurt. Add sliced tomato or lettuce if you like.'],tip:'If using wooden skewers over an open flame, soak them first. Cooking the pieces directly in a skillet works just as well.'},
{
  "id": "beef-broccoli",
  "name": "Beef & broccoli",
  "sub": "with ginger, soy & rice",
  "category": "Beef",
  "time": 25,
  "difficulty": "Easy",
  "description": "Beef & broccoli with ginger, soy & rice.",
  "ingredients": [
    [
      250,
      "g",
      "flank steak, thinly sliced"
    ],
    [
      300,
      "g",
      "broccoli florets"
    ],
    [
      150,
      "g",
      "rice"
    ],
    [
      2,
      "tbsp",
      "soy sauce"
    ],
    [
      1,
      "tbsp",
      "cornstarch"
    ],
    [
      1,
      "tbsp",
      "grated ginger"
    ],
    [
      1,
      "tbsp",
      "neutral oil"
    ],
    [
      1,
      "tsp",
      "brown sugar"
    ]
  ],
  "steps": [
    "Cook the rice according to the package. Whisk soy sauce, cornstarch, sugar and ¼ cup water per two servings.",
    "Sear the beef in hot oil for 2–3 minutes, working in batches. Transfer to a plate. Stir-fry broccoli for 4 minutes with a splash of water.",
    "Add ginger, beef and sauce. Toss until glossy and the beef reaches 145°F (63°C), then rest 3 minutes before serving over rice."
  ],
  "tip": "Slice across the grain for tender bites."
},
{
  "id": "pork-tenderloin",
  "name": "Mustard pork tenderloin",
  "sub": "with roasted carrots",
  "category": "Pork",
  "time": 40,
  "difficulty": "Easy",
  "description": "Mustard pork tenderloin with roasted carrots.",
  "ingredients": [
    [
      350,
      "g",
      "pork tenderloin"
    ],
    [
      400,
      "g",
      "carrots, cut into sticks"
    ],
    [
      2,
      "tbsp",
      "Dijon mustard"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ],
    [
      1,
      "tsp",
      "dried thyme"
    ]
  ],
  "steps": [
    "Heat oven to 425°F (220°C). Toss carrots with half the oil, salt and pepper. Roast for 10 minutes.",
    "Rub pork with mustard, thyme and remaining oil. Place beside carrots and roast for 18–25 minutes, until the center reaches 145°F (63°C).",
    "Rest the pork for at least 3 minutes. Slice and serve with the carrots."
  ],
  "tip": "Tuck the thin end of the pork underneath so it cooks evenly."
},
{
  "id": "sausage-peppers",
  "name": "Italian sausage & peppers",
  "sub": "with sweet onions",
  "category": "Pork",
  "time": 35,
  "difficulty": "Easy",
  "description": "Italian sausage & peppers with sweet onions.",
  "ingredients": [
    [
      300,
      "g",
      "Italian pork sausage links"
    ],
    [
      2,
      "",
      "bell peppers, sliced"
    ],
    [
      1,
      "",
      "onion, sliced"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ],
    [
      1,
      "tsp",
      "dried oregano"
    ]
  ],
  "steps": [
    "Heat oven to 425°F (220°C). Toss peppers and onion with oil, oregano and pepper.",
    "Spread vegetables on a sheet pan and add sausages. Roast for 25–30 minutes, turning halfway through, until sausages reach 160°F (71°C).",
    "Slice the sausages and toss with the vegetables and pan juices."
  ],
  "tip": "Use a large sheet pan so the peppers brown."
},
{
  "id": "chicken-fajitas",
  "name": "Chicken fajitas",
  "sub": "with peppers & warm tortillas",
  "category": "Chicken",
  "time": 30,
  "difficulty": "Easy",
  "description": "Chicken fajitas with peppers & warm tortillas.",
  "ingredients": [
    [
      300,
      "g",
      "boneless chicken breast, sliced"
    ],
    [
      2,
      "",
      "bell peppers, sliced"
    ],
    [
      1,
      "",
      "onion, sliced"
    ],
    [
      4,
      "",
      "flour tortillas"
    ],
    [
      1,
      "",
      "lime"
    ],
    [
      1,
      "tbsp",
      "neutral oil"
    ],
    [
      2,
      "tsp",
      "chili powder"
    ],
    [
      1,
      "tsp",
      "ground cumin"
    ]
  ],
  "steps": [
    "Toss chicken with half the oil, chili powder, cumin and salt. Cook in a hot skillet until browned and 165°F (74°C). Transfer to a clean plate.",
    "Add the rest of the oil and cook the peppers and onion for 6–8 minutes. Return chicken to the skillet and squeeze over half the lime.",
    "Warm the tortillas and fill with chicken and peppers. Serve with the remaining lime."
  ],
  "tip": "Let the pan heat before adding the peppers for better browning."
},
{
  "id": "lemon-orzo",
  "name": "Lemon spinach orzo",
  "sub": "with crumbled feta",
  "category": "Vegetarian",
  "time": 25,
  "difficulty": "Easy",
  "description": "Lemon spinach orzo with crumbled feta.",
  "ingredients": [
    [
      160,
      "g",
      "orzo"
    ],
    [
      100,
      "g",
      "baby spinach"
    ],
    [
      80,
      "g",
      "feta"
    ],
    [
      1,
      "",
      "lemon"
    ],
    [
      2,
      "",
      "garlic cloves, minced"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ]
  ],
  "steps": [
    "Cook orzo in salted water. Reserve a little cooking water before draining.",
    "Heat oil in a skillet and cook garlic for 30 seconds. Add spinach and stir until wilted.",
    "Add orzo, lemon zest and juice, and a splash of pasta water. Fold in feta and season to taste."
  ],
  "tip": "Use feta made with vegetarian rennet if needed."
},
{
  "id": "lentil-soup",
  "name": "Red lentil & tomato soup",
  "sub": "with cumin and carrots",
  "category": "Vegetarian",
  "time": 35,
  "difficulty": "Easy",
  "description": "Red lentil & tomato soup with cumin and carrots.",
  "ingredients": [
    [
      150,
      "g",
      "red lentils, rinsed"
    ],
    [
      400,
      "g",
      "crushed tomatoes"
    ],
    [
      500,
      "ml",
      "vegetable stock"
    ],
    [
      1,
      "",
      "carrot, diced"
    ],
    [
      1,
      "",
      "onion, diced"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ],
    [
      1,
      "tsp",
      "ground cumin"
    ]
  ],
  "steps": [
    "Soften onion and carrot in olive oil for 6 minutes. Add cumin and stir for 30 seconds.",
    "Add lentils, tomatoes and stock. Simmer for 22–25 minutes, stirring occasionally, until lentils are soft.",
    "Season to taste and add a little water if the soup is too thick."
  ],
  "tip": "The soup thickens as it cools. Add water when reheating."
},
{
  "id": "black-bean-tacos",
  "name": "Black bean tacos",
  "sub": "with avocado & lime",
  "category": "Vegetarian",
  "time": 20,
  "difficulty": "Easy",
  "description": "Black bean tacos with avocado & lime.",
  "ingredients": [
    [
      240,
      "g",
      "cooked black beans, drained"
    ],
    [
      1,
      "",
      "avocado"
    ],
    [
      1,
      "",
      "lime"
    ],
    [
      4,
      "",
      "corn tortillas"
    ],
    [
      1,
      "tsp",
      "ground cumin"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ]
  ],
  "steps": [
    "Warm oil and cumin in a skillet for 30 seconds. Add beans and a splash of water and simmer for 5 minutes. Mash some beans with a fork.",
    "Slice the avocado and toss with half the lime juice and a pinch of salt. Warm tortillas in a dry skillet.",
    "Fill tortillas with beans and avocado. Serve with the remaining lime."
  ],
  "tip": "Wrap warm tortillas in a towel to keep them pliable."
},
{
  "id": "cod-tomatoes",
  "name": "Baked cod & cherry tomatoes",
  "sub": "with olives & garlic",
  "category": "Fish",
  "time": 30,
  "difficulty": "Easy",
  "description": "Baked cod & cherry tomatoes with olives & garlic.",
  "ingredients": [
    [
      2,
      "",
      "cod fillets, about 150 g each"
    ],
    [
      250,
      "g",
      "cherry tomatoes"
    ],
    [
      50,
      "g",
      "pitted olives"
    ],
    [
      2,
      "",
      "garlic cloves, sliced"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ]
  ],
  "steps": [
    "Heat oven to 425°F (220°C). Toss tomatoes, olives and garlic with oil in a baking dish and roast for 10 minutes.",
    "Nestle cod into the tomatoes. Season with pepper and roast for 10–14 minutes until the center reaches 145°F (63°C).",
    "Serve the fish with the tomatoes and spoon the pan juices over it."
  ],
  "tip": "Pat the cod dry before adding it to the baking dish."
},
{
  "id": "shrimp-rice",
  "name": "Garlic shrimp & rice",
  "sub": "with peas & lemon",
  "category": "Fish",
  "time": 25,
  "difficulty": "Easy",
  "description": "Garlic shrimp & rice with peas & lemon.",
  "ingredients": [
    [
      250,
      "g",
      "raw peeled shrimp"
    ],
    [
      150,
      "g",
      "rice"
    ],
    [
      100,
      "g",
      "frozen peas"
    ],
    [
      2,
      "",
      "garlic cloves, minced"
    ],
    [
      1,
      "",
      "lemon"
    ],
    [
      1,
      "tbsp",
      "butter"
    ]
  ],
  "steps": [
    "Cook rice according to the package. Stir in peas during the last 3 minutes and finish cooking.",
    "Pat shrimp dry. Melt butter over medium-high heat, add garlic for 30 seconds, then add shrimp and cook until firm and opaque throughout, about 2 minutes per side.",
    "Squeeze lemon over the shrimp and serve over the rice and peas."
  ],
  "tip": "Thaw frozen shrimp before cooking so they cook evenly."
},
{
  "id": "chicken-tray",
  "name": "Chicken & sweet potato tray bake",
  "sub": "with roasted red onion",
  "category": "Chicken",
  "time": 45,
  "difficulty": "Easy",
  "description": "Chicken & sweet potato tray bake with roasted red onion.",
  "ingredients": [
    [
      400,
      "g",
      "boneless chicken thighs"
    ],
    [
      350,
      "g",
      "sweet potatoes, cubed"
    ],
    [
      1,
      "",
      "red onion, cut into wedges"
    ],
    [
      2,
      "tbsp",
      "olive oil"
    ],
    [
      1,
      "tsp",
      "smoked paprika"
    ]
  ],
  "steps": [
    "Heat oven to 425°F (220°C). Toss sweet potatoes and onion with half the oil and a pinch of salt. Roast for 10 minutes.",
    "Coat chicken in remaining oil, paprika, salt and pepper. Add to the pan and roast for 20–25 minutes, until chicken reaches 165°F (74°C).",
    "Serve chicken with the roasted vegetables and spoon over any pan juices."
  ],
  "tip": "Cut sweet potatoes into roughly ¾-inch cubes."
},
{
  "id": "turkey-meatballs",
  "name": "Turkey meatballs & spaghetti",
  "sub": "with tomato sauce",
  "category": "Turkey",
  "time": 35,
  "difficulty": "Easy",
  "description": "Turkey meatballs & spaghetti with tomato sauce.",
  "ingredients": [
    [
      300,
      "g",
      "ground turkey"
    ],
    [
      35,
      "g",
      "breadcrumbs"
    ],
    [
      1,
      "",
      "egg"
    ],
    [
      400,
      "g",
      "crushed tomatoes"
    ],
    [
      160,
      "g",
      "spaghetti"
    ],
    [
      1,
      "tsp",
      "dried oregano"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ]
  ],
  "steps": [
    "Mix turkey, breadcrumbs, egg, oregano and salt. Shape into small meatballs.",
    "Brown in olive oil, then add tomatoes and simmer gently for 12–15 minutes, until meatballs reach 165°F (74°C).",
    "Cook spaghetti in salted water, drain and serve topped with meatballs and sauce."
  ],
  "tip": "Moisten your hands before rolling the meatballs."
},
{
  "id": "chickpea-curry",
  "name": "Chickpea & spinach curry",
  "sub": "with coconut milk & rice",
  "category": "Vegetarian",
  "time": 30,
  "difficulty": "Easy",
  "description": "Chickpea & spinach curry with coconut milk & rice.",
  "ingredients": [
    [
      240,
      "g",
      "cooked chickpeas, drained"
    ],
    [
      200,
      "ml",
      "coconut milk"
    ],
    [
      200,
      "g",
      "crushed tomatoes"
    ],
    [
      100,
      "g",
      "baby spinach"
    ],
    [
      150,
      "g",
      "rice"
    ],
    [
      1,
      "tbsp",
      "curry powder"
    ],
    [
      1,
      "tbsp",
      "neutral oil"
    ]
  ],
  "steps": [
    "Cook rice according to the package.",
    "Warm oil in a skillet. Stir curry powder for 30 seconds, then add chickpeas, tomatoes and coconut milk. Simmer for 15 minutes.",
    "Fold in spinach until wilted. Season with salt and serve over rice."
  ],
  "tip": "For a thicker sauce, crush a spoonful of the chickpeas as the curry simmers."
},
{
  "id": "sesame-tofu",
  "name": "Crispy sesame tofu",
  "sub": "with green beans & rice",
  "category": "Vegetarian",
  "time": 30,
  "difficulty": "Easy",
  "description": "Crispy sesame tofu with green beans & rice.",
  "ingredients": [
    [
      300,
      "g",
      "extra-firm tofu"
    ],
    [
      200,
      "g",
      "green beans, trimmed"
    ],
    [
      150,
      "g",
      "rice"
    ],
    [
      2,
      "tbsp",
      "cornstarch"
    ],
    [
      2,
      "tbsp",
      "soy sauce"
    ],
    [
      1,
      "tbsp",
      "neutral oil"
    ],
    [
      1,
      "tsp",
      "sesame oil"
    ],
    [
      1,
      "tsp",
      "sesame seeds"
    ]
  ],
  "steps": [
    "Cook rice. Pat tofu dry, cube it and toss with cornstarch.",
    "Heat neutral oil and fry tofu for 8–10 minutes, turning until golden. Transfer to a plate. Stir-fry green beans for 5 minutes with a splash of water.",
    "Return tofu to the pan. Add soy sauce and sesame oil. Toss, sprinkle with sesame seeds and serve with rice."
  ],
  "tip": "Allow space between tofu cubes to crisp the edges."
},
{
  "id": "tomato-soup",
  "name": "Tomato soup & grilled cheese",
  "sub": "with sharp cheddar",
  "category": "Vegetarian",
  "time": 30,
  "difficulty": "Easy",
  "description": "Tomato soup & grilled cheese with sharp cheddar.",
  "ingredients": [
    [
      400,
      "g",
      "crushed tomatoes"
    ],
    [
      300,
      "ml",
      "vegetable stock"
    ],
    [
      1,
      "",
      "onion, diced"
    ],
    [
      2,
      "tbsp",
      "cream"
    ],
    [
      4,
      "",
      "bread slices"
    ],
    [
      100,
      "g",
      "cheddar, sliced"
    ],
    [
      2,
      "tbsp",
      "butter"
    ]
  ],
  "steps": [
    "Soften onion in half the butter for 5 minutes. Add tomatoes and stock and simmer 15 minutes. Blend with an immersion blender and stir in cream.",
    "Divide cheese between two sandwiches. Butter their outer sides with remaining butter.",
    "Toast sandwiches in a skillet over medium heat for 3–4 minutes per side. Serve with hot soup."
  ],
  "tip": "Keep the skillet at medium heat so the cheddar melts before the bread burns."
},
{
  "id": "potato-leek",
  "name": "Potato & leek soup",
  "sub": "with cream & chives",
  "category": "Vegetarian",
  "time": 35,
  "difficulty": "Easy",
  "description": "Potato & leek soup with cream & chives.",
  "ingredients": [
    [
      400,
      "g",
      "Yukon Gold potatoes, diced"
    ],
    [
      2,
      "",
      "leeks, white and light green parts sliced"
    ],
    [
      500,
      "ml",
      "vegetable stock"
    ],
    [
      60,
      "ml",
      "cream"
    ],
    [
      1,
      "tbsp",
      "butter"
    ],
    [
      1,
      "tbsp",
      "chopped chives"
    ]
  ],
  "steps": [
    "Rinse sliced leeks thoroughly. Soften them in butter over medium heat for 7 minutes.",
    "Add potatoes and stock and simmer 20 minutes, until potatoes are soft. Blend briefly with an immersion blender.",
    "Stir in cream, season to taste and scatter chives over each bowl."
  ],
  "tip": "Blend only until smooth to keep the potatoes from turning gluey."
},
{
  "id": "beef-chili",
  "name": "Beef & kidney bean chili",
  "sub": "with tomatoes & cumin",
  "category": "Beef",
  "time": 45,
  "difficulty": "Easy",
  "description": "Beef & kidney bean chili with tomatoes & cumin.",
  "ingredients": [
    [
      300,
      "g",
      "ground beef"
    ],
    [
      240,
      "g",
      "cooked kidney beans, drained"
    ],
    [
      400,
      "g",
      "crushed tomatoes"
    ],
    [
      1,
      "",
      "onion, diced"
    ],
    [
      1,
      "tbsp",
      "chili powder"
    ],
    [
      1,
      "tsp",
      "ground cumin"
    ],
    [
      1,
      "tbsp",
      "neutral oil"
    ]
  ],
  "steps": [
    "Heat oil and soften onion for 5 minutes. Add beef and break it up with a spoon. Cook to 160°F (71°C).",
    "Stir in chili powder and cumin, then add tomatoes, beans and ½ cup water per two servings.",
    "Simmer uncovered for 25 minutes. Stir occasionally and season to taste."
  ],
  "tip": "This freezes well in individual portions."
},
{
  "id": "pesto-chicken",
  "name": "Basil pesto chicken",
  "sub": "with cherry tomatoes & couscous",
  "category": "Chicken",
  "time": 30,
  "difficulty": "Easy",
  "description": "Basil pesto chicken with cherry tomatoes & couscous.",
  "ingredients": [
    [
      2,
      "",
      "boneless chicken breasts, about 150 g each"
    ],
    [
      200,
      "g",
      "cherry tomatoes"
    ],
    [
      120,
      "g",
      "couscous"
    ],
    [
      3,
      "tbsp",
      "basil pesto"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ]
  ],
  "steps": [
    "Heat oven to 425°F (220°C). Toss tomatoes in oil and add chicken to the dish. Spread two-thirds of the pesto over chicken.",
    "Roast for 18–24 minutes, until chicken reaches 165°F (74°C). Prepare couscous according to its package.",
    "Fluff couscous and stir in remaining pesto from the clean jar. Serve with chicken, tomatoes and pan juices."
  ],
  "tip": "Choose similarly sized breasts so they cook at the same rate."
},
{
  "id": "shakshuka",
  "name": "Tomato & pepper shakshuka",
  "sub": "with gently poached eggs",
  "category": "Vegetarian",
  "time": 30,
  "difficulty": "Easy",
  "description": "Tomato & pepper shakshuka with gently poached eggs.",
  "ingredients": [
    [
      4,
      "",
      "eggs"
    ],
    [
      400,
      "g",
      "crushed tomatoes"
    ],
    [
      1,
      "",
      "red bell pepper, diced"
    ],
    [
      1,
      "",
      "onion, diced"
    ],
    [
      1,
      "tsp",
      "ground cumin"
    ],
    [
      1,
      "tbsp",
      "olive oil"
    ]
  ],
  "steps": [
    "Soften pepper and onion in oil for 7 minutes. Stir in cumin, tomatoes and salt. Simmer 10 minutes until slightly thickened.",
    "Make four wells in the sauce and crack an egg into each. Cover and simmer gently until the whites and yolks are set.",
    "Season with pepper and serve directly from the skillet."
  ],
  "tip": "A wide skillet leaves space between the eggs."
},
{
  "id": "tuna-pasta",
  "name": "Lemon tuna pasta",
  "sub": "with sweet peas",
  "category": "Fish",
  "time": 20,
  "difficulty": "Easy",
  "description": "Lemon tuna pasta with sweet peas.",
  "ingredients": [
    [
      180,
      "g",
      "pasta"
    ],
    [
      140,
      "g",
      "canned tuna, drained"
    ],
    [
      100,
      "g",
      "frozen peas"
    ],
    [
      1,
      "",
      "lemon"
    ],
    [
      2,
      "tbsp",
      "olive oil"
    ],
    [
      1,
      "",
      "garlic clove, minced"
    ]
  ],
  "steps": [
    "Cook pasta in salted water and add peas during the final 2 minutes. Reserve a mug of pasta water before draining.",
    "Warm oil and garlic in a skillet for 30 seconds. Add pasta, peas, tuna, lemon zest and a splash of pasta water.",
    "Toss gently until warmed through. Finish with lemon juice and black pepper."
  ],
  "tip": "Add pasta water a little at a time until it coats the noodles."
},
{
  "id": "apple-oats",
  "name": "Apple cinnamon baked oats",
  "sub": "with rolled oats & maple syrup",
  "category": "Breakfast",
  "time": 40,
  "difficulty": "Easy",
  "description": "Apple cinnamon baked oats with rolled oats & maple syrup.",
  "ingredients": [
    [
      100,
      "g",
      "rolled oats"
    ],
    [
      1,
      "",
      "apple, diced"
    ],
    [
      240,
      "ml",
      "milk"
    ],
    [
      1,
      "",
      "egg"
    ],
    [
      2,
      "tbsp",
      "maple syrup"
    ],
    [
      1,
      "tsp",
      "ground cinnamon"
    ],
    [
      0.5,
      "tsp",
      "baking powder"
    ]
  ],
  "steps": [
    "Heat oven to 350°F (175°C) and lightly grease a small baking dish.",
    "Whisk milk, egg and maple syrup. Stir in oats, cinnamon, baking powder and apple.",
    "Bake for 30–35 minutes until the center is set and reaches 160°F (71°C). Rest for 5 minutes before serving."
  ],
  "tip": "Use an apple that holds its shape, such as Honeycrisp."
}
];
const $=s=>document.querySelector(s),image=r=>`images/${r.id}.webp`;let active='All recipes',savedOnly=false;let favorites;try{favorites=JSON.parse(localStorage.getItem('atable-saved')||'[]');if(!Array.isArray(favorites))favorites=[]}catch{favorites=[]}
function render(){const query=$('#search').value.toLowerCase();const list=recipes.filter(r=>(active==='All recipes'||r.category===active)&&(!savedOnly||favorites.includes(r.id))&&[r.name,r.sub,...r.ingredients.map(i=>i[2])].join(' ').toLowerCase().includes(query));$('#cards').innerHTML=list.map(r=>`<article class="card"><div class="card-image"><img src="${image(r)}" alt="${r.name} ${r.sub}" loading="lazy"></div><button class="save" data-save="${r.id}" aria-label="${favorites.includes(r.id)?'Unsave':'Save'} ${r.name}" aria-pressed="${favorites.includes(r.id)}">${favorites.includes(r.id)?'♥':'♡'}</button><div class="card-content"><p class="eyebrow">${r.category} · THE EVERYDAY COLLECTION</p><button class="open-recipe" data-open="${r.id}"><h3>${r.name}</h3><p class="desc">${r.sub}</p><div class="meta"><span>◷ ${r.time} MIN</span><span>${r.difficulty}</span><span>View card ↗</span></div></button></div></article>`).join('');$('#empty').hidden=!!list.length;$('#result-count').textContent=`${String(list.length).padStart(2,'0')} ${savedOnly?'SAVED ':''}RECIPES TO MAKE YOUR OWN`;$('#saved-count').textContent=favorites.length;$('#saved').setAttribute('aria-pressed',savedOnly);}
$('#filters').innerHTML=['All recipes', ...new Set(recipes.map(recipe => recipe.category))].map((c,i)=>`<button data-filter="${c}" class="${i?'':'active'}" aria-pressed="${!i}">${c}</button>`).join('');$('#filters').onclick=e=>{const b=e.target.closest('[data-filter]');if(!b)return;active=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});render()};$('#search').oninput=render;$('#saved').onclick=()=>{savedOnly=!savedOnly;render();$('#recipes').scrollIntoView({behavior:'smooth'})};$('#cards').onclick=e=>{const save=e.target.closest('[data-save]'),open=e.target.closest('[data-open]');if(save){const id=save.dataset.save;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];try{localStorage.setItem('atable-saved',JSON.stringify(favorites))}catch{}render()}if(open)show(open.dataset.open)};
let current,servings=2;function show(id){current=recipes.find(r=>r.id===id);servings=2;detail();$('#recipe').showModal();document.body.style.overflow='hidden'}function detail(){const r=current;$('#recipe-body').innerHTML=`<img class="detail-photo" src="${image(r)}" alt="${r.name} ${r.sub}"><div class="detail"><p class="eyebrow">À TABLE / ${r.category.toUpperCase()}</p><h2>${r.name}</h2><p>${r.sub}<br>${r.description}</p><div class="detail-tools"><span>◷ ${r.time} minutes · ${r.difficulty}</span><button id="minus" aria-label="Fewer servings" ${servings<=1?'disabled':''}>−</button><span>${servings} servings</span><button id="plus" aria-label="More servings">+</button><button id="print">Print card ↗</button></div><div class="detail-columns"><section><h3>What you'll need</h3><ul class="ingredients">${r.ingredients.map(i=>`<li><label><input type="checkbox"><span>${Number((i[0]*servings/2).toFixed(2))} ${i[1]} ${i[2]}</span></label></li>`).join('')}</ul><p class="tip">Pantry staples: salt and black pepper.</p></section><section><h3>Let's get cooking</h3><ol class="steps">${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="tip"><strong>A little kitchen wisdom</strong><br>${r.tip}</p><p style="font-size:10px;color:#758071">Ingredient amounts scale with servings; use a suitably sized pan.</p></section></div></div>`;$('#minus').onclick=()=>{servings--;detail()};$('#plus').onclick=()=>{servings++;detail()};$('#print').onclick=()=>window.print()}
function closeRecipe(){$('#recipe').close();document.body.style.overflow=''}$('.close').onclick=closeRecipe;$('#recipe').addEventListener('close',()=>document.body.style.overflow='');$('#recipe').addEventListener('click',e=>{if(e.target===$('#recipe')){const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeRecipe()}});$('#featured').onclick=()=>show('salmon');render();
