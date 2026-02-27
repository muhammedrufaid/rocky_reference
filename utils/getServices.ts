import { getData } from './getData'

export async function getOffPlanProperties(): Promise<any | undefined> {
    try {
      return await getData(`frontend/properties/off-plan?page=1&limit=20`, 0)
    } catch (error) {
      console.error('Failed to fetch featured data:', error)
      // throw notFound();
    }
}