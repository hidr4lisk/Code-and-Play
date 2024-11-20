function damageCalculator(daño, critico, esquivaObjetivo, bloqueoObjetivo, armaduraObjetivo){
    let total = daño
    if(critico > 0){
      total += daño
    } else if(esquivaObjetivo){
        total = 0
    } else if(bloqueoObjetivo){
        total = total * 0,9 - armaduraObjetivo
    }
    return total
  }